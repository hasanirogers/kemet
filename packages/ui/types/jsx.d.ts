import { LitElement } from 'lit';
import 'react';

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
import KemetDialogClass from '../dist/elements/dialog';
import KemetDialogCloseClass from '../dist/elements/dialog-close';
import KemetDrawerClass from '../dist/elements/drawer';
import KemetFabClass from '../dist/elements/fab';
import KemetFieldClass from '../dist/elements/field';
import KemetFlipcardClass from '../dist/elements/flipcard';
import KemetFlipcardTriggerClass from '../dist/elements/flipcard-trigger';
import KemetIconClass from '../dist/elements/icon';
import KemetInputClass from '../dist/elements/input';
import KemetInputComboClass from '../dist/elements/input-combo';
import KemetPasswordClass from '../dist/elements/password';
import KemetRadioClass from '../dist/elements/radio';
import KemetRadiosClass from '../dist/elements/radios';
import KemetRotatorClass from '../dist/elements/rotator';
import KemetSelectClass from '../dist/elements/select';
import KemetSelectOptionClass from '../dist/elements/select-option';
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
type ReactLitProps<T extends LitElement> =
  Omit<React.HTMLAttributes<T>, 'children'> &
  Partial<LitElementProps<T>> & {
    ref?: React.Ref<T>;
    children?: React.ReactNode;
    slot?: string;
  };


declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'kemet-accordion': ReactLitProps<KemetAccordionClass>;
      'kemet-accordion-panel': ReactLitProps<KemetAccordionPanelClass>;
      'kemet-alert': ReactLitProps<KemetAlertClass>;
      'kemet-avatar': ReactLitProps<KemetAvatarClass>;
      'kemet-badge': ReactLitProps<KemetBadgeClass>;
      'kemet-button': ReactLitProps<KemetButtonClass>;
      'kemet-card': ReactLitProps<KemetCardClass>;
      'kemet-checkbox': ReactLitProps<KemetCheckboxClass>;
      'kemet-combo': ReactLitProps<KemetComboClass>;
      'kemet-count': ReactLitProps<KemetCountClass>;
      'kemet-dialog': ReactLitProps<KemetDialogClass>;
      'kemet-drawer': ReactLitProps<KemetDrawerClass>;
      'kemet-fab': ReactLitProps<KemetFabClass>;
      'kemet-field': ReactLitProps<KemetFieldClass>;
      'kemet-flipcard': ReactLitProps<KemetFlipcardClass>;
      'kemet-flipcard-trigger': ReactLitProps<KemetFlipcardTriggerClass>;
      'kemet-icon': ReactLitProps<KemetIconClass>;
      'kemet-input': ReactLitProps<KemetInputClass>;
      'kemet-input-combo': ReactLitProps<KemetInputComboClass>;
      'kemet-input-file': ReactLitProps<KemetInputFileClass>;
      'kemet-input-files': ReactLitProps<KemetInputFilesClass>;
      'kemet-password': ReactLitProps<KemetPasswordClass>;
      'kemet-radio': ReactLitProps<KemetRadioClass>;
      'kemet-radios': ReactLitProps<KemetRadiosClass>;
      'kemet-rotator': ReactLitProps<KemetRotatorClass>;
      'kemet-select': ReactLitProps<KemetSelectClass>;
      'kemet-sortable': ReactLitProps<KemetSortableClass>;
      'kemet-tab': ReactLitProps<KemetTabClass>;
      'kemet-tab-panel': ReactLitProps<KemetTabPanelClass>;
      'kemet-tabs': ReactLitProps<KemetTabsClass>;
      'kemet-textarea': ReactLitProps<KemetTextareaClass>;
      'kemet-timer': ReactLitProps<KemetTimerClass>;
      'kemet-timer-display': ReactLitProps<KemetTimerDisplayClass>;
      'kemet-toggle': ReactLitProps<KemetToggleClass>;
      'kemet-tracker': ReactLitProps<KemetTrackerClass>;
      'kemet-tracker-step': ReactLitProps<KemetTrackerStepClass>;
      'kemet-input-otp': ReactLitProps<KemetInputOtpClass>;
      'kemet-typewriter': ReactLitProps<KemetTypewriterClass>;
    }
  }
}

export {};
