import { Injectable } from '@angular/core';
import { ToastrService, GlobalConfig } from 'ngx-toastr';

declare var clientid: any;
declare var instance_name: any;
declare var base_url: any;
declare var site_url: any;
declare var idc: any;
declare var udt_enable: any;
declare var custom_tag_enable: any;
declare var multi_variant_enable: any;
declare var sdk_type: any;
declare var error_msg;
@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
    public siteId: any;
    clientid = clientid;
    udt_enable = udt_enable;
    custom_tag_enable = custom_tag_enable;
    multi_variant_enable = multi_variant_enable;
    paneldata = {
        instance_name: instance_name,
        clientid: clientid,
        base_url: base_url,
        site_url: site_url,
        trackingid: '',
        cms_shopify_api_key: '',
        cms_shopify_redirect_uri: ''
    };

    optin_type: 'single';

    website = {
        id: null,
        cid: '',
        siteid: '',
        siteurl: '',
        type: 'https',
        domainSaved: false,
        subdomain: '',
        auth_key: '',
        apikey: '',
        sender_id: '',
        fcm_enabled: 0,
        apns_enabled: 0,
        bpn_enabled: 0,
        geo_enabled: '0',
        co_exist: 0,
        activity_enabled: 1,
        js_enabled: 1,
        p12file: '',
        ios_p12: '',
        ios_pass: '',
        apns_website_id: '',
        apns_fileupload_path: '',
        p12filename: '',
        useForPush: 0,
        optin_type: 'single',
        multisite: '',
        p12FileChanged: false,
        cms_type: '',
        cms_store_name: '',
        cms_status: 0
    };

    websiteTabs = {
        showbpnSetting: false,
        showSetting: true,
        showCustomNoti: false,
        showOptinRule: true,
        showAck: false
    };
    constructor (private toastr: ToastrService) {
      try {
        this.udt_enable = +udt_enable === 1 ;
      } catch (e) {
        this.udt_enable = false;
      }
    }

    toastOption: Partial<GlobalConfig> = {
      preventDuplicates: true,
      maxOpened: 1,
      enableHtml: true,
      closeButton: true
    };

    public getBaseUrl = (): string => {
        return this.paneldata.base_url;
    }

    public getSiteUrl = (): string => {
        return this.paneldata.site_url;
    }

    public setSiteId = (value): any => {
        this.siteId = value;
    }

    public getSiteId = () => {
        return this.siteId;
    }

    public getClientId = () => {
        return this.clientid;
    }

    public getUdtStatus = () => {
      return this.udt_enable;
    }

    public getCustomTagStatus = () => {
      return this.custom_tag_enable;
    }

    public getMultiVariantStatus = () => {
      return this.multi_variant_enable;
    }

    public getTrackingId = (): string => {
      return this.paneldata.trackingid;
    }

    public getShopifyApiKey = (): string => {
      return this.paneldata.cms_shopify_api_key;
    }

    public getShopifyRedirectUri = (): string => {
      return this.paneldata.cms_shopify_redirect_uri;
    }

    public showError(message, title = '') {
      this.toastr.error(message, title);
    }

    public showSuccess(message, title = '') {
      this.toastr.success(message, title);
    }

    public showInfo(message, title = '') {
      this.toastr.info(message, title);
    }

    public getServerName() {
      return idc;
    }

    public getSdkVersion = (): string => {
      return sdk_type;
    }

    public getErrorCodes =(): any => {
      return error_msg;
    }
}

