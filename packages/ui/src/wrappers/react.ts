import * as React from 'react';
import {createComponent, EventName} from '@lit/react';

import Accordion from '../elements/accordion';
import AccordionPanel from '../elements/accordion-panel';
import Button from '../elements/button';
import Alert from '../elements/alert';
import Avatar from '../elements/avatar';
import Avatars from '../elements/avatars';
import Badge from '../elements/badge';
import Card from '../elements/card';
import Checkbox from '../elements/checkbox';
import Count from '../elements/count';
import Combo, { InterfaceKemetSelectionEvent as InterfaceSelectionDetails } from '../elements/combo';
import Drawer from '../elements/drawer';
import Fab from '../elements/fab';
import Field from '../elements/field';
import Flipcard from '../elements/flipcard';
import FlipcardTrigger from '../elements/flipcard-trigger';
import Icon from '../elements/icon';
import Input from '../elements/input';
import Dialog from '../elements/dialog';
import DialogClose from '../elements/dialog-close';
import InputCombo from '../elements/input-combo';
import Password, { InterfacePasswordStrengthChangeDetails } from '../elements/password';
import Radio from '../elements/radio';
import Radios from '../elements/radios';
import Rotator from '../elements/rotator';
import Select from '../elements/select';
import SelectOption from '../elements/select-option';
import Sortable, { InterfaceSortableDragDetails } from '../elements/sortable';
import SortableItem from '../elements/sortable-item';
import Tab from '../elements/tab';
import TabPanel from '../elements/tab-panel';
import Tabs, { InterfaceTabsDetails } from '../elements/tabs';
import Toggle from '../elements/toggle';
import Timer from '../elements/timer';
import TimerDisplay from '../elements/timer-display';
import Tracker from '../elements/tracker';
import TrackerStep from '../elements/tracker-step';
import InputFiles, { InterfaceUploadChangeDetails } from '../elements/input-files';
import InputFile from '../elements/input-file';
import { InterfaceInputDetails } from '../utilities/constants';
import Typewriter from '../elements/typewriter';


export const KemetAccordion = createComponent({
  tagName: 'kemet-accordion',
  elementClass: Accordion,
  react: React,
});

export const KemetAccordionPanel = createComponent({
  tagName: 'kemet-accordion-panel',
  elementClass: AccordionPanel,
  react: React,
  events: {
    onOpened: 'kemet-opened' as EventName<CustomEvent<AccordionPanel>>,
    onClosed: 'kemet-closed' as EventName<CustomEvent<AccordionPanel>>,
  },
});

export const KemetAlert = createComponent({
  tagName: 'kemet-alert',
  elementClass: Alert,
  react: React,
  events: {
    onOpened: 'kemet-opened' as EventName<CustomEvent<Alert>>,
    onClosed: 'kemet-closed' as EventName<CustomEvent<Alert>>,
  },
});

export const KemetAvatar = createComponent({
  tagName: 'kemet-avatar',
  elementClass: Avatar,
  react: React,
});

export const KemetAvatars = createComponent({
  tagName: 'kemet-avatars',
  elementClass: Avatars,
  react: React,
});

export const KemetBadge = createComponent({
  tagName: 'kemet-badge',
  elementClass: Badge,
  react: React,
});

export const KemetButton = createComponent({
  tagName: 'kemet-button',
  elementClass: Button,
  react: React,
});

export const KemetCard = createComponent({
  tagName: 'kemet-card',
  elementClass: Card,
  react: React,
});

export const KemetCheckbox = createComponent({
  tagName: 'kemet-checkbox',
  elementClass: Checkbox,
  react: React,
  events: {
    onChange: 'kemet-change' as EventName<CustomEvent<Checkbox>>,
    onFocus: 'kemet-focus' as EventName<CustomEvent<boolean>>,
    onBlur: 'kemet-blur' as EventName<CustomEvent<boolean>>,
  },
});

export const KemetCombo = createComponent({
  tagName: 'kemet-combo',
  elementClass: Combo,
  react: React,
  events: {
    onSelection: 'kemet-input-combo-selection' as EventName<CustomEvent<InterfaceSelectionDetails>>,
  }
});

export const KemetCount = createComponent({
  tagName: 'kemet-count',
  elementClass: Count,
  react: React,
  events: {
    onStatusChange: 'kemet-status-change' as EventName<CustomEvent<InterfaceInputDetails>>,
  }
});

export const KemetDrawer = createComponent({
  tagName: 'kemet-drawer',
  elementClass: Drawer,
  react: React,
  events: {
    onOpened: 'kemet-opened' as EventName<CustomEvent<Drawer>>,
    onClosed: 'kemet-closed' as EventName<CustomEvent<Drawer>>,
  }
});

export const KemetFab = createComponent({
  tagName: 'kemet-fab',
  elementClass: Fab,
  react: React,
});

export const KemetField = createComponent({
  tagName: 'kemet-field',
  elementClass: Field,
  react: React,
});

export const KemetFlipcardTrigger = createComponent({
  tagName: 'kemet-flipcard-trigger',
  elementClass: FlipcardTrigger,
  react: React,
  events: {
    onFlipped: 'kemet-flipped' as EventName<CustomEvent<FlipcardTrigger>>,
  }
});

export const KemetFlipcard = createComponent({
  tagName: 'kemet-flipcard',
  elementClass: Flipcard,
  react: React,
});

export const KemetIcon = createComponent({
  tagName: 'kemet-icon',
  elementClass: Icon,
  react: React,
});

export const KemetInput = createComponent({
  tagName: 'kemet-input',
  elementClass: Input,
  react: React,
  events: {
    onInput: 'kemet-input' as EventName<CustomEvent<InterfaceInputDetails>>,
    onFocus: 'kemet-focus' as EventName<CustomEvent<Input>>,
    onBlur: 'kemet-blur' as EventName<CustomEvent<Input>>,
    onStatusChange: 'kemet-status-change' as EventName<CustomEvent<InterfaceInputDetails>>,
  }
});

export const KemetDialog = createComponent({
  tagName: 'kemet-dialog',
  elementClass: Dialog,
  react: React,
  events: {
    onOpened: 'kemet-opened' as EventName<CustomEvent<Dialog>>,
    onClosed: 'kemet-closed' as EventName<CustomEvent<Dialog>>,
  }
});

export const KemetDialogClose = createComponent({
  tagName: 'kemet-dialog-close',
  elementClass: DialogClose,
  react: React,
  events: {
    onClosedPressed: 'kemet-closed-pressed' as EventName<CustomEvent<DialogClose>>,
  }
});

export const KemetInputCombo = createComponent({
  tagName: 'kemet-input-combo',
  elementClass: InputCombo,
  react: React,
  events: {
    onInput: 'kemet-input' as EventName<CustomEvent<InputCombo>>,
    onFocus: 'kemet-focus' as EventName<CustomEvent<InputCombo>>
  }
});

export const KemetSelectOption = createComponent({
  tagName: 'kemet-select-option',
  elementClass: SelectOption,
  react: React,
});

export const KemetPassword = createComponent({
  tagName: 'kemet-password',
  elementClass: Password,
  react: React,
  events: {
    onStatusChange: 'kemet-status-change' as EventName<CustomEvent<InterfacePasswordStrengthChangeDetails>>,
  }
});

export const KemetRadio = createComponent({
  tagName: 'kemet-radio',
  elementClass: Radio,
  react: React,
  events: {
    onFocus: 'kemet-focus' as EventName<CustomEvent<boolean>>,
    onBlur: 'kemet-blur' as EventName<CustomEvent<boolean>>,
  }
});

export const KemetRadios = createComponent({
  tagName: 'kemet-radios',
  elementClass: Radios,
  react: React,
  events: {
    onChange: 'kemet-change' as EventName<CustomEvent<Radios>>,
  }
});

export const KemetRotator = createComponent({
  tagName: 'kemet-rotator',
  elementClass: Rotator,
  react: React,
});

export const KemetSelect = createComponent({
  tagName: 'kemet-select',
  elementClass: Select,
  react: React,
  events: {
    onChange: 'kemet-change' as EventName<CustomEvent<InterfaceInputDetails>>,
    onFocus: 'kemet-focus' as EventName<CustomEvent<Select>>,
    onBlur: 'kemet-blur' as EventName<CustomEvent<Select>>,
    onStatusChange: 'kemet-status-change' as EventName<CustomEvent<InterfaceInputDetails>>,
  }
});

export const KemetSortable = createComponent({
  tagName: 'kemet-sortable',
  elementClass: Sortable,
  react: React,
  events: {
    onDragStart: 'kemet-drag-start' as EventName<CustomEvent<InterfaceSortableDragDetails>>,
    onDragOver: 'kemet-drag-over' as EventName<CustomEvent<InterfaceSortableDragDetails>>,
    onDragEnd: 'kemet-drag-end' as EventName<CustomEvent<InterfaceSortableDragDetails>>,
  }
});

export const KemetSortableItem = createComponent({
  tagName: 'kemet-sortable-item',
  elementClass: SortableItem,
  react: React,
});

export const KemetTab = createComponent({
  tagName: 'kemet-tab',
  elementClass: Tab,
  react: React,
  events: {
    onSelected: 'kemet-selected' as EventName<CustomEvent<Tab>>,
    onClosed: 'kemet-closed' as EventName<CustomEvent<Tab>>,
  }
});

export const KemetTabPanel = createComponent({
  tagName: 'kemet-tab-panel',
  elementClass: TabPanel,
  react: React,
});

export const KemetTabs = createComponent({
  tagName: 'kemet-tabs',
  elementClass: Tabs,
  react: React,
  events: {
    onChange: 'kemet-change' as EventName<CustomEvent<InterfaceTabsDetails>>,
  }
});

export const KemetToggle = createComponent({
  tagName: 'kemet-toggle',
  elementClass: Toggle,
  react: React,
  events: {
    onChange: 'kemet-change' as EventName<CustomEvent<Toggle>>,
  }
});

export const KemetTimer = createComponent({
  tagName: 'kemet-timer',
  elementClass: Timer,
  react: React,
  events: {
    onStart: 'kemet-start' as EventName<CustomEvent<Timer>>,
    onIncrement: 'kemet-increment' as EventName<CustomEvent<number>>,
    onComplete: 'kemet-complete' as EventName<CustomEvent<Timer>>,
  }
});

export const KemetTimerDisplay = createComponent({
  tagName: 'kemet-timer-display',
  elementClass: TimerDisplay,
  react: React,
});

export const KemetTracker = createComponent({
  tagName: 'kemet-tracker',
  elementClass: Tracker,
  react: React,
});

export const KemetTrackerStep = createComponent({
  tagName: 'kemet-tracker-step',
  elementClass: TrackerStep,
  react: React,
});

export const KemetInputFiles = createComponent({
  tagName: 'kemet-input-files',
  elementClass: InputFiles,
  react: React,
  events: {
    onChange: 'kemet-change' as EventName<CustomEvent<InterfaceUploadChangeDetails>>,
  }
});

export const KemetInputFile = createComponent({
  tagName: 'kemet-input-file',
  elementClass: InputFile,
  react: React,
});

export const KemetTypewriter = createComponent({
  tagName: 'kemet-typewriter',
  elementClass: Typewriter,
  react: React,
});

export type KemetAccordionClass = Accordion;
export type KemetAccordionPanelClass = AccordionPanel;
export type KemetAlertClass = Alert;
export type KemetAvatarClass = Avatar;
export type KemetAvatarsClass = Avatars;
export type KemetBadgeClass = Badge;
export type KemetButtonClass = Button;
export type KemetCardClass = Card;
export type KemetCheckboxClass = Checkbox;
export type KemetComboClass = Combo;
export type KemetCountClass = Count;
export type KemetDrawerClass = Drawer;
export type KemetFabClass = Fab;
export type KemetFieldClass = Field;
export type KemetFlipcardClass = Flipcard;
export type KemetFlipcardTriggerClass = FlipcardTrigger;
export type KemetIcon = Icon;
export type KemetInputClass = Input;
export type KemetModalClass = Dialog;
export type KemetModalCloseClass = DialogClose;
export type KemetMultiInputClass = InputCombo;
export type KemetOptionClass = SelectOption;
export type KemetPasswordClass = Password;
export type KemetRadioClass = Radio;
export type KemetRadiosClass = Radios;
export type KemetRotatorClass = Rotator;
export type KemetSelectClass = Select;
export type KemetSortableClass = Sortable;
export type KemetSortableItemClass = SortableItem;
export type KemetTabClass = Tab;
export type KemetTabPanelClass = TabPanel;
export type KemetTabsClass = Tabs;
export type KemetToggleClass = Toggle;
export type KemetTimerClass = Timer;
export type KemetTimerDisplayClass = TimerDisplay;
export type KemetTrackerClass = Tracker;
export type KemetTrackerStepClass = TrackerStep;
export type KemetUploadClass = InputFiles;
export type KemetUploadFileClass = InputFile;
export type KemetTypewriterClass = Typewriter;

export type KemetEventDetailsSelection = InterfaceSelectionDetails;
export type KemetEventDetailsStatusChange = InterfaceInputDetails;
export type KemetEventDetailsPasswordStatusChange = InterfacePasswordStrengthChangeDetails;
export type KemetEventDetailsSortableDrag = InterfaceSortableDragDetails;
export type KemetEventDetailsTabs = InterfaceTabsDetails;
export type KemetEventDetailsUploadChange = InterfaceUploadChangeDetails;
