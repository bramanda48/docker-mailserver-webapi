import { DnsRecord } from "./dns-record.model.ts";

export enum DKIMValidator {
  opendkim = "opendkim",
  rspamd = "rspamd",
}
export class DKIM {
  private validator: DKIMValidator;
  private selector: string;
  private domain: string;
  private publicKey: string;
  private privateKey: string;
  private dnsRecord: DnsRecord;

  constructor(
    $validator: DKIMValidator,
    $selector: string,
    $domain: string,
    $publicKey?: string,
    $privateKey?: string,
    $dnsRecord?: DnsRecord
  ) {
    this.validator = $validator;
    this.selector = $selector;
    this.domain = $domain;
    this.publicKey = $publicKey;
    this.privateKey = $privateKey;
    this.dnsRecord = $dnsRecord;
  }

  /**
   * Getter $validator
   * @return {DKIMValidator}
   */
  public get $validator(): DKIMValidator {
    return this.validator;
  }

  /**
   * Getter $selector
   * @return {string}
   */
  public get $selector(): string {
    return this.selector;
  }

  /**
   * Getter $domain
   * @return {string}
   */
  public get $domain(): string {
    return this.domain;
  }

  /**
   * Getter $publicKey
   * @return {string}
   */
  public get $publicKey(): string {
    return this.publicKey;
  }

  /**
   * Getter $privateKey
   * @return {string}
   */
  public get $privateKey(): string {
    return this.privateKey;
  }

  /**
   * Getter $dnsRecord
   * @return {DnsRecord}
   */
  public get $dnsRecord(): DnsRecord {
    return this.dnsRecord;
  }
}
