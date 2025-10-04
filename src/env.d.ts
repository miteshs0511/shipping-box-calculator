interface ImportMetaEnv {
  readonly VITE_MULTIPLIER_SWEDEN?: string;
  readonly VITE_MULTIPLIER_CHINA?: string;
  readonly VITE_MULTIPLIER_BRAZIL?: string;
  readonly VITE_MULTIPLIER_AUSTRALIA?: string;

  // Vite built-ins
  readonly MODE?: string;
  readonly DEV?: boolean;
  readonly PROD?: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
