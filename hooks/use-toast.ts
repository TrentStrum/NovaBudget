'use client';

import { useToast as useToastOriginal } from "@/components/ui/toast/use-toast";

export const useToast = () => {
  return useToastOriginal();
};