"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import SellPhoneModal from "./components/SellPhoneModal";

type Phone = {
  id: string;
  name: string;
  brand: string;
  model: string | null;
  storage: string | null;
  ram: string | null;
  color: string | null;
  condition: string;
  price: number;
  cost_price: number | null;
  quantity: number;
  status: string;
  image_url: string | null;
};

type VendorProfile = {
  full_name: string | null;
  business_name: string | null;
  phone_number: string | null;
};

type PhoneForm = {
  name: string;
  brand: string;
  model: string;
  storage: string;
  ram: string;
  color: string;
  condition: string;
  price: string;
  cost_price: string;
  quantity: string;
};

const initialForm: PhoneForm = {
  name: "",
  brand: "",
  model: "",
  storage: "",
  ram: "",
  color: "",
  condition: "Brand New",
  price: "",
  cost_price: "",
  quantity: "",
};

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const maximumImageSize = 5 * 1024 * 1024;

export default function ProductsPage() {
  const { user } = useAuth();

  const [selectedPhone, setSelectedPhone] =
    useState<Phone | null>(null);

  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState<PhoneForm>(initialForm);

  const updateForm = (
    field: keyof PhoneForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const brands = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          phones
            .map((phone) => phone.brand)
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b))
        )
      ),
    ],
    [phones]
  );

  const filteredPhones = useMemo(() => {
    const query = search.trim().toLowerCase();

    return phones.filter((phone) => {
      const matchesSearch =
        !query ||
        phone.name.toLowerCase().includes(query) ||
        phone.brand.toLowerCase().includes(query) ||
        phone.condition.toLowerCase().includes(query) ||
        phone.model?.toLowerCase().includes(query) ||
        phone.storage?.toLowerCase().includes(query);

      const matchesBrand =
        brandFilter === "All" ||
        phone.brand === brandFilter;

      return matchesSearch && matchesBrand;
    });
  }, [brandFilter, phones, search]);

  const fetchPhones = useCallback(async () => {
    if (!user) {
      setPhones([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("phones")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      setPhones(data ?? []);
    } catch (fetchError) {
      toast.error("Unable to load phones", {
        description:
          fetchError instanceof Error
            ? fetchError.message
            : "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!allowedImageTypes.includes(file.type)) {
      toast.error("Unsupported image format", {
        description:
          "Upload a JPG, PNG, or WebP phone image.",
      });

      event.target.value = "";
      return;
    }

    if (file.size > maximumImageSize) {
      toast.error("Image is too large", {
        description:
          "Choose an image smaller than 5 MB.",
      });

      event.target.value = "";
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(previewUrl);

    toast.success("Image selected", {
      description: `${file.name} is ready to upload.`,
    });
  };

  const removeSelectedImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview("");
  };

  const uploadPhoneImage = async (): Promise<{
    imageUrl: string;
    imagePath: string;
  } | null> => {
    if (!imageFile || !user) return null;

    const fileExtension =
      imageFile.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${crypto.randomUUID()}.${fileExtension}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("phone-images")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: imageFile.type,
      });

    if (uploadError) {
      throw new Error(
        `Image upload failed: ${uploadError.message}`
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("phone-images")
      .getPublicUrl(filePath);

    if (!publicUrlData.publicUrl) {
      await supabase.storage
        .from("phone-images")
        .remove([filePath]);

      throw new Error(
        "The image uploaded, but its public URL could not be generated."
      );
    }

    return {
      imageUrl: publicUrlData.publicUrl,
      imagePath: filePath,
    };
  };

  const fetchVendorProfile =
    async (): Promise<VendorProfile | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, business_name, phone_number")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        throw new Error(
          `Unable to load vendor details: ${error.message}`
        );
      }

      return data;
    };

  const addPhone = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (saving) return;

    if (!user) {
      toast.error("Authentication required", {
        description:
          "Please sign in again before adding a phone.",
      });

      return;
    }

    if (!form.name.trim()) {
      toast.error("Phone name is required");
      return;
    }

    if (!form.brand.trim()) {
      toast.error("Phone brand is required");
      return;
    }

    const sellingPrice = Number(form.price);
    const quantity = Number(form.quantity);
    const costPrice = form.cost_price
      ? Number(form.cost_price)
      : null;

    if (
      !form.price ||
      !Number.isFinite(sellingPrice) ||
      sellingPrice <= 0
    ) {
      toast.error("Enter a valid selling price", {
        description:
          "The selling price must be greater than zero.",
      });

      return;
    }

    if (
      !form.quantity ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      toast.error("Enter a valid quantity", {
        description:
          "Quantity must be a whole number greater than zero.",
      });

      return;
    }

    if (
      costPrice !== null &&
      (!Number.isFinite(costPrice) || costPrice < 0)
    ) {
      toast.error("Enter a valid cost price");
      return;
    }

    const toastId = toast.loading("Adding phone...", {
      description: imageFile
        ? "Uploading the image and saving the product."
        : "Saving the phone to your inventory.",
    });

    let uploadedImagePath: string | null = null;

    try {
      setSaving(true);

      const vendorProfile = await fetchVendorProfile();

      const uploadedImage = await uploadPhoneImage();

      uploadedImagePath =
        uploadedImage?.imagePath ?? null;

      if (uploadedImage) {
        toast.loading("Image uploaded", {
          id: toastId,
          description: "Saving the phone details...",
        });
      }

      const sellerName =
        vendorProfile?.business_name?.trim() ||
        vendorProfile?.full_name?.trim() ||
        "Phone Vendor";

      const sellerPhone =
        vendorProfile?.phone_number?.trim() || null;

      const { error: insertError } = await supabase
        .from("phones")
        .insert({
          user_id: user.id,
          name: form.name.trim(),
          brand: form.brand.trim(),
          model: form.model.trim() || null,
          storage: form.storage.trim() || null,
          ram: form.ram.trim() || null,
          color: form.color.trim() || null,
          condition: form.condition,
          price: sellingPrice,
          cost_price: costPrice,
          quantity,
          status: "Available",
          image_url: uploadedImage?.imageUrl ?? null,
          seller_name: sellerName,
          seller_phone: sellerPhone,
        });

      if (insertError) {
        throw new Error(insertError.message);
      }

      toast.success("Phone added successfully", {
        id: toastId,
        description: `${form.name.trim()} is now in your inventory.`,
      });

      setForm(initialForm);
      removeSelectedImage();

      await fetchPhones();
    } catch (addError) {
      /*
        If the image uploaded but the database insert failed,
        remove the unused image from Storage.
      */
      if (uploadedImagePath) {
        const { error: cleanupError } =
          await supabase.storage
            .from("phone-images")
            .remove([uploadedImagePath]);

        if (cleanupError) {
          console.error(
            "Unable to remove unused uploaded image:",
            cleanupError.message
          );
        }
      }

      toast.error("Unable to add phone", {
        id: toastId,
        description:
          addError instanceof Error
            ? addError.message
            : "An unexpected error occurred.",
      });
    } finally {
      setSaving(false);
    }
  };

  const extractStoragePath = (
    publicUrl: string
  ): string | null => {
    const marker = "/phone-images/";

    if (!publicUrl.includes(marker)) {
      return null;
    }

    const encodedPath = publicUrl.split(marker)[1];

    return encodedPath
      ? decodeURIComponent(encodedPath.split("?")[0])
      : null;
  };

  const deletePhone = async (phone: Phone) => {
    const confirmed = window.confirm(
      `Delete ${phone.name}? This action cannot be undone.`
    );

    if (!confirmed || deletingId) return;

    const toastId = toast.loading("Deleting phone...", {
      description: `Removing ${phone.name} from your inventory.`,
    });

    try {
      setDeletingId(phone.id);

      /*
        Delete the database record first.

        This prevents the product from remaining in the database
        with a broken image if database deletion fails.
      */
      const { error: deleteError } = await supabase
        .from("phones")
        .delete()
        .eq("id", phone.id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      if (phone.image_url) {
        const imagePath = extractStoragePath(
          phone.image_url
        );

        if (imagePath) {
          const { error: storageError } =
            await supabase.storage
              .from("phone-images")
              .remove([imagePath]);

          if (storageError) {
            console.warn(
              "Product deleted, but image cleanup failed:",
              storageError.message
            );
          }
        }
      }

      toast.success("Phone deleted", {
        id: toastId,
        description: `${phone.name} was removed successfully.`,
      });

      setPhones((currentPhones) =>
        currentPhones.filter(
          (currentPhone) =>
            currentPhone.id !== phone.id
        )
      );
    } catch (deleteError) {
      toast.error("Unable to delete phone", {
        id: toastId,
        description:
          deleteError instanceof Error
            ? deleteError.message
            : "An unexpected error occurred.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-cyan-300">
          Inventory
        </p>

        <h1 className="mt-2 text-3xl font-black md:text-4xl">
          Products
        </h1>

        <p className="mt-3 text-white/50">
          Add, search, filter, sell, and manage your real
          phone inventory.
        </p>
      </div>

      <form
        onSubmit={addPhone}
        className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="mb-6 flex items-center gap-2 text-xl font-black">
          <Plus size={20} />
          Add New Phone
        </h2>

        <div className="mb-6 overflow-hidden rounded-2xl border border-dashed border-white/10 bg-[#071020] p-5">
          {imagePreview ? (
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-white/5 md:w-48">
                <Image
                  src={imagePreview}
                  alt="Selected phone preview"
                  fill
                  sizes="192px"
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-bold">{imageFile?.name}</p>

                <p className="mt-2 text-sm text-white/45">
                  This image will be uploaded when you add the
                  phone.
                </p>

                <button
                  type="button"
                  disabled={saving}
                  onClick={removeSelectedImage}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={16} />
                  Remove image
                </button>
              </div>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 py-6 text-center">
              <Upload
                className="text-cyan-300"
                size={30}
              />

              <span className="font-bold">
                Upload phone image
              </span>

              <span className="text-sm text-white/45">
                JPG, PNG or WebP — maximum 5 MB
              </span>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={saving}
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            className="input"
            placeholder="Phone Name"
            value={form.name}
            disabled={saving}
            onChange={(event) =>
              updateForm("name", event.target.value)
            }
          />

          <input
            className="input"
            placeholder="Brand"
            value={form.brand}
            disabled={saving}
            onChange={(event) =>
              updateForm("brand", event.target.value)
            }
          />

          <input
            className="input"
            placeholder="Model"
            value={form.model}
            disabled={saving}
            onChange={(event) =>
              updateForm("model", event.target.value)
            }
          />

          <input
            className="input"
            placeholder="Storage e.g. 128GB"
            value={form.storage}
            disabled={saving}
            onChange={(event) =>
              updateForm("storage", event.target.value)
            }
          />

          <input
            className="input"
            placeholder="RAM e.g. 8GB"
            value={form.ram}
            disabled={saving}
            onChange={(event) =>
              updateForm("ram", event.target.value)
            }
          />

          <input
            className="input"
            placeholder="Color"
            value={form.color}
            disabled={saving}
            onChange={(event) =>
              updateForm("color", event.target.value)
            }
          />

          <select
            className="input"
            value={form.condition}
            disabled={saving}
            onChange={(event) =>
              updateForm("condition", event.target.value)
            }
          >
            <option>Brand New</option>
            <option>UK Used</option>
            <option>Nigeria Used</option>
          </select>

          <input
            className="input"
            type="number"
            min="1"
            step="0.01"
            placeholder="Selling Price"
            value={form.price}
            disabled={saving}
            onChange={(event) =>
              updateForm("price", event.target.value)
            }
          />

          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            placeholder="Cost Price (optional)"
            value={form.cost_price}
            disabled={saving}
            onChange={(event) =>
              updateForm("cost_price", event.target.value)
            }
          />

          <input
            className="input"
            type="number"
            min="1"
            step="1"
            placeholder="Quantity"
            value={form.quantity}
            disabled={saving}
            onChange={(event) =>
              updateForm("quantity", event.target.value)
            }
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 inline-flex items-center gap-3 rounded-xl bg-cyan-400 px-6 py-4 font-black text-[#050816] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving && (
            <Loader2
              className="animate-spin"
              size={18}
            />
          )}

          {saving ? "Adding Phone..." : "Add Phone"}
        </button>
      </form>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-xl font-black">
          Phone Inventory
        </h2>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="search"
            placeholder="Search phones..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="input md:max-w-sm"
          />

          <select
            value={brandFilter}
            onChange={(event) =>
              setBrandFilter(event.target.value)
            }
            className="input md:max-w-xs"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="mt-8 flex items-center gap-3 text-white/50">
            <Loader2
              size={19}
              className="animate-spin text-cyan-300"
            />
            Loading phones...
          </div>
        ) : filteredPhones.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-12 text-center">
            <ImageIcon
              size={38}
              className="text-white/20"
            />

            <p className="mt-4 font-bold text-white/55">
              No phones found
            </p>

            <p className="mt-2 text-sm text-white/35">
              Add a phone or change your current filters.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="text-white/40">
                <tr>
                  <th className="py-3">Image</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Condition</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPhones.map((phone) => (
                  <tr
                    key={phone.id}
                    className="border-t border-white/10"
                  >
                    <td className="py-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white/10">
                        {phone.image_url ? (
                          <Image
                            src={phone.image_url}
                            alt={phone.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ImageIcon
                              size={18}
                              className="text-white/30"
                            />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="font-bold">
                      {phone.name}
                    </td>

                    <td>{phone.brand}</td>
                    <td>{phone.condition}</td>

                    <td>
                      ₦
                      {Number(phone.price).toLocaleString(
                        "en-NG"
                      )}
                    </td>

                    <td>{phone.quantity}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          phone.status === "Available"
                            ? "bg-cyan-400/10 text-cyan-300"
                            : "bg-red-500/10 text-red-300"
                        }`}
                      >
                        {phone.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPhone(phone)
                          }
                          disabled={
                            phone.quantity <= 0 ||
                            deletingId === phone.id
                          }
                          className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-black text-[#050816] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
                        >
                          Sell
                        </button>

                        <button
                          type="button"
                          aria-label={`Delete ${phone.name}`}
                          onClick={() =>
                            deletePhone(phone)
                          }
                          disabled={deletingId === phone.id}
                          className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {deletingId === phone.id ? (
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedPhone && (
        <SellPhoneModal
          phone={selectedPhone}
          onClose={() => setSelectedPhone(null)}
          onSaleComplete={fetchPhones}
        />
      )}
    </div>
  );
}