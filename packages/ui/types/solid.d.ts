import { LitElement } from 'lit';
import type { JSX as SolidJSX } from 'solid-js';
import React from 'react';

import KemetAccordionClass from '../dist/elements/accordion';
import KemetAccordionPanelClass from '../dist/elements/accordion-panel';
import KemetAlertClass from '../dist/elements/alert';
import KemetAvatarClass from '../dist/elements/avatar';
import KemetBadgeClass from '../dist/elements/badge';
import KemetButtonClass from '../dist/elements/button';
import KemetCardClass from '../dist/elements/card';
import KemetCheckboxClass from '../dist/elements/checkbox';
import KemetComboClass from '../dist/elements/combo';
import KemetCountClass from '../dist/elements/count';
import KemetDrawerClass from '../dist/elements/drawer';
import KemetFabClass from '../dist/elements/fab';
import KemetFieldClass from '../dist/elements/field';
import KemetFlipcardClass from '../dist/elements/flipcard';
import KemetFlipcardTriggerClass from '../dist/elements/flipcard-trigger';
import KemetIconClass from '../dist/elements/icon';
import KemetInputClass from '../dist/elements/input';
import KemetDialogClass from '../dist/elements/dialog';
import KemetDialogCloseClass from '../dist/elements/dialog-close';
import KemetInputComboClass from '../dist/elements/input-combo';
import KemetPasswordClass from '../dist/elements/password';
import KemetRadioClass from '../dist/elements/radio';
import KemetRadiosClass from '../dist/elements/radios';
import KemetRotatorClass from '../dist/elements/rotator';
import KemetSelectClass from '../dist/elements/select';
import KemetSortableClass from '../dist/elements/sortable';
import KemetTabClass from '../dist/elements/tab';
import KemetTabPanelClass from '../dist/elements/tab-panel';
import KemetTabsClass from '../dist/elements/tabs';
import KemetTextareaClass from '../dist/elements/textarea';
import KemetTimerClass from '../dist/elements/timer';
import KemetTimerDisplayClass from '../dist/elements/timer-display';
import KemetToggleClass from '../dist/elements/toggle';
import KemetTrackerClass from '../dist/elements/tracker';
import KemetTrackerStepClass from '../dist/elements/tracker-step';
import KemetInputFilesClass from '../dist/elements/input-files';
import KemetInputFileClass from '../dist/elements/input-file';
import KemetTypewriterClass from '../dist/elements/typewriter';
import KemetInputOtpClass from '../dist/elements/input-otp';

/**
 * Extract only data properties (no methods) from a type
 */
type DataProps<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K];
};

/**
 * Extract custom properties from a LitElement instance (excluding base LitElement props)
 */
type LitElementProps<T extends LitElement> = Omit<
  DataProps<T>,
  keyof LitElement
>;

/**
 * Create React-compatible props for a Lit custom element
 */
type SolidLitProps<T extends LitElement> =
  Omit<React.HTMLAttributes<T>, 'children' | 'ref'> &
  Partial<LitElementProps<T>> & {
    ref?: T | ((el: T) => void);
    children?: SolidJSX.Element;
    slot?: string;
  };

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'kemet-accordion': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetAccordionClass>;
      'kemet-accordion-panel': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetAccordionPanelClass>;
      'kemet-alert': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetAlertClass>;
      'kemet-avatar': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetAvatarClass>;
      'kemet-badge': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetBadgeClass>;
      'kemet-button': SolidJSX.IntrinsicElements['button'] & SolidLitProps<KemetButtonClass>;
      'kemet-card': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetCardClass>;
      'kemet-checkbox': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetCheckboxClass>;
      'kemet-combo': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetComboClass>;
      'kemet-count': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetCountClass>;
      'kemet-drawer': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetDrawerClass>;
      'kemet-fab': SolidJSX.IntrinsicElements['button'] & SolidLitProps<KemetFabClass>;
      'kemet-field': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetFieldClass>;
      'kemet-flipcard': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetFlipcardClass>;
      'kemet-flipcard-trigger': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetFlipcardTriggerClass>;
      'kemet-input': SolidJSX.IntrinsicElements['input'] & SolidLitProps<KemetInputClass>;
      'kemet-modal': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetDialogClass>;
      'kemet-input-combo': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetInputComboClass>;
      'kemet-password': SolidJSX.IntrinsicElements['input'] & SolidLitProps<KemetPasswordClass>;
      'kemet-radio': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetRadioClass>;
      'kemet-rotator': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetRotatorClass>;
      'kemet-select': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetSelectClass>;
      'kemet-sortable': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetSortableClass>;
      'kemet-tab': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetTabClass>;
      'kemet-tab-panel': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetTabPanelClass>;
      'kemet-tabs': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetTabsClass>;
      'kemet-textarea': SolidJSX.IntrinsicElements['textarea'] & SolidLitProps<KemetTextareaClass>;
      'kemet-timer': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetTimerClass>;
      'kemet-toggle': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetToggleClass>;
      'kemet-tracker': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetTrackerClass>;
      'kemet-input-files': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetInputFilesClass>;
      'kemet-input-file': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetInputFileClass>;
      'kemet-dialog': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetDialogClass>;
      'kemet-dialog-close': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetDialogCloseClass>;
      'kemet-radios': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetRadiosClass>;
      'kemet-tracker-step': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetTrackerStepClass>;
      'kemet-timer-display': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetTimerDisplayClass>;
      'kemet-typewriter': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetTypewriterClass>;
      'kemet-icon': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetIconClass>;
      'kemet-input-otp': SolidJSX.IntrinsicElements['div'] & SolidLitProps<KemetInputOtpClass>;
    }
  }
}
