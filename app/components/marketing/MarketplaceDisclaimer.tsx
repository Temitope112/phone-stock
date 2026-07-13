import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function MarketplaceDisclaimer() {
  return (
    <aside className="rounded-[1.5rem] border border-amber-400/20 bg-amber-400/[0.06] p-5 md:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
          <ShieldAlert size={22} />
        </div>

        <div>
          <h2 className="font-black text-amber-200">
            Marketplace safety notice
          </h2>

          <p className="mt-2 text-sm leading-7 text-white/50">
            PhoneStock helps customers discover phones listed by independent
            vendors. Verify the device, seller identity, condition, warranty,
            payment details, and delivery arrangement before sending money.
            PhoneStock does not currently hold customer payments or guarantee
            transactions completed directly with vendors.
          </p>

          <Link
            href="/terms-and-conditions"
            className="mt-3 inline-flex text-sm font-bold text-amber-300 transition hover:text-white"
          >
            Read the marketplace terms
          </Link>
        </div>
      </div>
    </aside>
  );
}