import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import Popper, { PopperOptions } from 'popper.js';
import { fromEvent, merge } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

@Directive({
  selector: '[appPopper]'
})
export class PopperDirective {

  // The hint to display
@Input() target: HTMLElement;
// Its positioning (check docs for available options)
@Input() placement?: string;
// Optional hint target if you desire using other element than
// specified one
@Input() appPopper?: HTMLElement;

// The popper instance
private popper: Popper;

constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {}

ngOnInit(): void {
  // An element to position the hint relative to
  const reference = this.appPopper ? this.appPopper : this.el.nativeElement;
  this.popper = new Popper(reference, this.target, this.defaultConfig);

  this.renderer.setStyle(this.target, "display", "none");
  merge(
    fromEvent(reference, "mouseenter"),
    fromEvent(reference, "mouseleave")
  ).pipe(
    filter(() => this.popper != null),
    pluck("type")
  ).subscribe((e: any) => this.mouseHoverHandler(e));
}
ngOnDestroy(): void {
  if (!this.popper) {
    return;
  }

  this.popper.destroy();
}

private readonly defaultConfig: PopperOptions = {
  placement: "top",
  removeOnDestroy: true,
  modifiers: {
    arrow: {
      element: ".popper__arrow"
    }
  }
};

private mouseHoverHandler(e: string): void {
  if (e === "mouseenter") {
    this.renderer.removeStyle(this.target, "display");
    this.popper.enableEventListeners();
    this.popper.scheduleUpdate();
  
  } else {
    this.renderer.setStyle(this.target, "display", "none");
    this.popper.disableEventListeners();
  }
}

}

