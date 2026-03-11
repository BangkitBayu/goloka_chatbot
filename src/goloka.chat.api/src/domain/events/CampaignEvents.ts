/**
 * Domain Event fired when a campaign blast starts.
 */
export interface CampaignStartedEvent {
  readonly eventName: 'CAMPAIGN_STARTED';
  readonly campaignId: string;
  readonly userId: string;
  readonly sessionId: string;
  readonly recipientCount: number;
  readonly occurredAt: Date;
}

/**
 * Domain Event fired when a campaign completes.
 */
export interface CampaignCompletedEvent {
  readonly eventName: 'CAMPAIGN_COMPLETED';
  readonly campaignId: string;
  readonly sentCount: number;
  readonly failedCount: number;
  readonly occurredAt: Date;
}

export type DomainEvent = CampaignStartedEvent | CampaignCompletedEvent;
