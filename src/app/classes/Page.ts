import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export default abstract class Page implements OnDestroy {
  private subscriptions: Subscription[] = [];

  protected addSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
