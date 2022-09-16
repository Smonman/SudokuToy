import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const voidStyles: { [property: string]: string | number } = {
  opacity: 0,
  transform: 'translateY(20px) scale(0.97)',
};
const transitionDuration = 300;
const transitionCurve = 'cubic-bezier(0.4, 0, .1, 1)';
const transitionDelay = 0;

/** Animations, that an element fades in from the bottom. */
export const fixedAppearAnimation: AnimationTriggerMetadata = trigger(
  'fixedAppear',
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
