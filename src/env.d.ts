interface ImportMetaEnv {
  readonly GTM_ID: string;
  readonly ENVIRONMENT: "development" | "production";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
