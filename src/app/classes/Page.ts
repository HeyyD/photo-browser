import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export default abstract class Page implements OnDestroy {
  private subscriptions: Subscription[] = [];

  protected addSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  protected addSubscriptions(subscriptions: Subscription[]): void {
    subscriptions.forEach(subscription => this.subscriptions.push(subscription));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
