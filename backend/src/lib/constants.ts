export const mainnetId = "mainnet";
export const testnetId = "testnet";
export const sandboxId = "sandbox";

export const selectedRangeValues: { [key: string]: number } = {
  "7D": 7,
  "1M": 30,
  ALL: Number.MAX_SAFE_INTEGER
};

const productionMainnetApiUrl = "https://api.cloudmos.io";
const productionTestnetApiUrl = "https://api-testnet.cloudmos.io";
const productionSandboxApiUrl = "https://api-sandbox.cloudmos.io";
const productionHostnames = ["akash-trackr-hub.vercel.app"];

export const isProd = process.env.NODE_ENV === "production";
export const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
export const BASE_API_MAINNET_URL = getApiMainnetUrl();
export const BASE_API_TESTNET_URL = getApiTestnetUrl();
export const BASE_API_SANDBOX_URL = getApiSandboxUrl();

export const BASE_API_URL = getApiUrl();

export function getNetworkBaseApiUrl(network: string | null) {
  switch (network) {
    case testnetId:
      return BASE_API_TESTNET_URL;
    case sandboxId:
      return BASE_API_SANDBOX_URL;
    default:
      return BASE_API_MAINNET_URL;
  }
}

export const uAktDenom = "uakt";
export const usdcIbcDenoms: { [key: string]: string } = {
  [mainnetId]: "ibc/170C677610AC31DF0904FFE09CD3B5C657492170E7E52372E48756B71E56F2F1",
  [sandboxId]: "ibc/12C6A0C374171B595A0A9E18B83FA09D295FB1F2D8C6DAA3AC28683471752D84"
};

function getApiMainnetUrl() {
  if (process.env.API_MAINNET_BASE_URL) return process.env.API_MAINNET_BASE_URL;
  if (typeof window === "undefined") return "https://api.cloudmos.io";
  if (productionHostnames.includes(window.location?.hostname)) return productionMainnetApiUrl;
  return "https://api.cloudmos.io";
}

function getApiTestnetUrl() {
  if (process.env.API_TESTNET_BASE_URL) return process.env.API_TESTNET_BASE_URL;
  if (typeof window === "undefined") return "https://api.cloudmos.io";
  if (productionHostnames.includes(window.location?.hostname)) return productionTestnetApiUrl;
  return "https://api.cloudmos.io";
}

function getApiSandboxUrl() {
  if (process.env.API_SANDBOX_BASE_URL) return process.env.API_SANDBOX_BASE_URL;
  if (typeof window === "undefined") return "https://api.cloudmos.io";
  if (productionHostnames.includes(window.location?.hostname)) return productionSandboxApiUrl;
  return "https://api.cloudmos.io";
}

function getApiUrl() {
  if (process.env.API_BASE_URL) return process.env.API_BASE_URL;
  if (typeof window === "undefined") return "https://api.cloudmos.io";
  if (productionHostnames.includes(window.location?.hostname)) {
    try {
      const _selectedNetworkId = localStorage.getItem("selectedNetworkId");
      return getNetworkBaseApiUrl(_selectedNetworkId);
    } catch (e) {
      console.error(e);
      return productionMainnetApiUrl;
    }
  }
  return "https://api.cloudmos.io";
}

export let selectedNetworkId = "";
export let networkVersion: "v1beta2" | "v1beta3";

export function setNetworkVersion() {
  const _selectedNetworkId = localStorage.getItem("selectedNetworkId");

  switch (_selectedNetworkId) {
    case mainnetId:
      networkVersion = "v1beta3";
      selectedNetworkId = mainnetId;
      break;
    case testnetId:
      networkVersion = "v1beta3";
      selectedNetworkId = testnetId;
      break;
    case sandboxId:
      networkVersion = "v1beta3";
      selectedNetworkId = sandboxId;
      break;

    default:
      networkVersion = "v1beta3";
      selectedNetworkId = mainnetId;
      break;
  }
}
