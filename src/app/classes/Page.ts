import { Subscription } from 'rxjs';

abstract class Page {
  private subscriptions: Subscription[] = [];
}
