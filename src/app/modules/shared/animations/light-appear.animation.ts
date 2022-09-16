import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

const voidStyles: { [property: string]: string | number } = {
  opacity: 0,
  transform: 'scale(.85)',
};
const transitionDuration = 150;
const transitionCurve = 'cubic-bezier(0.4, 0, .1, 1)';
const transitionDelay = 0;

/** Animations, that an element fades in and scales up a bit. */
export const lightAppearAnimation: AnimationTriggerMetadata = trigger(
  'lightAppear',
  [
    state('void', style(voidStyles)),

    transition(':enter', [
      animate(`${transitionDuration}ms ${transitionDelay}ms ${transitionCurve}`),
    ]),
    transition(':leave', [
      animate(`${transitionDuration}ms ${transitionCurve}`, style(voidStyles)),
    ]),
  ],
);
