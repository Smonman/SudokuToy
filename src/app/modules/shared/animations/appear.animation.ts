import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

const voidStyles: { [property: string]: string | number } = {
  opacity: 0,
  transform: 'scale(0)',
  margin: 0,
  height: 0,
};
const transitionDuration = 250;
const transitionCurve = 'cubic-bezier(0.4, 0, .1, 1)';
const transitionDelay = 0;

/** Animations, that an element fades in and scales up out of nowhere. */
export const appearAnimation: AnimationTriggerMetadata = trigger('appear', [
  state('void', style(voidStyles)),

  transition(':enter', [
    animate(`${transitionDuration}ms ${transitionDelay}ms ${transitionCurve}`),
  ]),
  transition(':leave', [
    animate(`${transitionDuration}ms ${transitionCurve}`, style(voidStyles)),
  ]),
]);
