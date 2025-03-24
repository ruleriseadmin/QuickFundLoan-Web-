declare module '@mono.co/connect.js' {
    interface MonoConnectOptions {
      key: string;
      scope?: string;
      data?: Record<string, any>;
      onClose?: () => void;
      onLoad?: () => void;
      onEvent?: (eventName: string, data: any) => void;
      onSuccess?: (response: { code: string }) => void;
    }
  
    export default class MonoConnect {
      constructor(options: MonoConnectOptions);
      setup(): void;
      open(): void;
    }
  }

  declare namespace JSX {
    interface IntrinsicElements {
      'qoreid-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        clientId?: string;
        flowId?: number | string;
        productCode?: string;
        customerReference?: string;
        applicantData?: string;
        onQoreIDSdkSubmitted?: string;
        onQoreIDSdkError?: string;
        onQoreIDSdkClosed?: string;
      };
    }
  }

  declare class HyperKycConfig {
    constructor(accessToken: string | undefined, workflowID: string | undefined, transactionID: string);
  }
  
  declare namespace HyperKYCModule {
    function launch(config: HyperKycConfig, handler: (result: any) => void): void;
  }
  
  interface Window {
    HyperKycConfig: typeof HyperKycConfig;
    HyperKYCModule: typeof HyperKYCModule;
  }
  
  
  