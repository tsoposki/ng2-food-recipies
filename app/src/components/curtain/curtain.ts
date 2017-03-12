import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

@Component({
  selector: 'curtain',
  moduleId: module.id,
  templateUrl: 'curtain.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurtainComponent {
  @Input() shouldShow: boolean = true;
  @Input() cStyle = true;
}
