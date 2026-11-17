import type { Metadata } from "next";

import { UiShowcase } from "@/components/ui/showcase";

export const metadata: Metadata = {
  title: "Bileşen önizleme · Martrin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UiPage() {
  return <UiShowcase />;
}
