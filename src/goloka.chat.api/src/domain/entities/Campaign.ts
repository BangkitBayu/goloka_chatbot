import { Entity } from '../base/Entity';

export type CampaignStatus = 'DRAFT' | 'QUEUED' | 'RUNNING' | 'DONE' | 'FAILED';

export interface CampaignProps {
  userId: string;
  sessionId: string;
  name: string;
  messageContent: string;
  mediaUrl?: string | null;
  scheduledAt?: Date | null;
  status: CampaignStatus;
  sentCount: number;
  failedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * BroadcastCampaign Domain Entity
 */
export class Campaign extends Entity<string> {
  private _status: CampaignStatus;
  private _sentCount: number;
  private _failedCount: number;
  readonly userId: string;
  readonly sessionId: string;
  readonly name: string;
  readonly messageContent: string;
  readonly mediaUrl?: string | null;
  readonly scheduledAt?: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(id: string, props: CampaignProps) {
    super(id);
    this.userId = props.userId;
    this.sessionId = props.sessionId;
    this.name = props.name;
    this.messageContent = props.messageContent;
    this.mediaUrl = props.mediaUrl;
    this.scheduledAt = props.scheduledAt;
    this._status = props.status;
    this._sentCount = props.sentCount;
    this._failedCount = props.failedCount;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(id: string, props: CampaignProps): Campaign {
    return new Campaign(id, props);
  }

  /** Business rule: campaign can only be sent if DRAFT or FAILED */
  canSend(): boolean {
    return this._status === 'DRAFT' || this._status === 'FAILED';
  }

  markAsRunning(): void {
    this._status = 'RUNNING';
  }

  markAsDone(): void {
    this._status = 'DONE';
  }

  markAsFailed(): void {
    this._status = 'FAILED';
  }

  incrementSent(): void {
    this._sentCount++;
  }

  incrementFailed(): void {
    this._failedCount++;
  }

  get status(): CampaignStatus {
    return this._status;
  }
  get sentCount(): number {
    return this._sentCount;
  }
  get failedCount(): number {
    return this._failedCount;
  }
}
