import { html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { emitEvent } from '../../utilities/events';
import { EnumAppearances } from '../../utilities/constants';
import HTMLKemetFieldElement from '../field';
import HTMLKemetInputElement from '../input';
import HTMLKemetTextareaElement from '../textarea';
import '../icon';
import styles from './styles.css?inline';

interface InterfaceOptions {
  pattern: string;
  message: string;
  meetsCriteria?: boolean;
}

export interface InterfacePasswordStrengthChangeDetails {
  appearance: EnumAppearances;
  meetsPasswordCriteria: boolean;
  element: KemetPassword;
}

/**
 * @since 1.2.0
 * @status stable
 *
 * @tagname kemet-password
 * @summary Gauges the strength of a password entered by the user.
 *
 * @prop {array} rules - An array of objects containing the rules the password must meet.
 * @prop {boolean} show - Controls the display of the component.
 * @prop {string} value - The value of the input component.
 * @prop {string} message - A message that is above the rules.
 * @prop {string} strength - The strength of the password. Weak | Better | Strong.
 * @prop {string} icon
 * @prop {number} iconSize
 *
 * @event kemet-password-strength-change - Fires when there's a change in strength.
 *
 * @csspart strength - Indicates password strength.
 * @csspart indicator - The strength indicator bars.
 * @csspart message - A message to display to the user.
 * @csspart rules - A description of rules to follow.
 *
 */

@customElement('kemet-password')
export default class KemetPassword extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: Array })
  rules: InterfaceOptions[] = [
    { pattern: '(?=.{8,}$)', message: 'At least 8 characters long' },
    { pattern: '(?=.*[a-z])(?=.*[A-Z])', message: 'Uppercase and lowercase' },
    { pattern: '(?=.*[0-9])', message: 'At least one number (0-9)' },
  ];

  @property({ type: Boolean, reflect: true })
  show: boolean = false;

  @property({ type: String })
  value!: string;

  @property({ type: String })
  message: string = 'Please make sure you meet all the requirements.';

  @property({ type: String })
  strength!: string;

  @property({ type: String })
  icon: string = 'check2';

  @property({ type: Number })
  iconSize: number = 18;

  @state()
  appearance?: EnumAppearances;

  @state()
  field!: HTMLKemetFieldElement;

  @state()
  input!: HTMLKemetInputElement | HTMLKemetTextareaElement;

  firstUpdated() {
    // elements
    this.field = this.closest('kemet-field') as HTMLKemetFieldElement;
    this.input = this.field.querySelector('[slot="input"]') as HTMLKemetInputElement | HTMLKemetTextareaElement;

    // events listeners
    this.input?.addEventListener('kemet-input-input', this.handleInput.bind(this));
  }

  render() {
    return html`
      <div role="alert" aria-live="assertive">
        <div class="${this.strength}" part="strength">
          <span>${this.strength}</span>
          <ul part="indicator">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <p part="message">${this.message}</p>
        <ul part="rules">
          ${this.makeRules()}
        </ul>
      </div>
    `;
  }

  /**
   * Makes the list of rules
   * @private
   * @returns {TemplateResult<1>[]} the criteria rules
   */
  makeRules(): TemplateResult<1>[] {
    if (this.input) {
      return this.rules.map((rule) => {
        const regExp = new RegExp(rule.pattern);
        const meetsCriteria = regExp.test(this.input.value);
        rule.meetsCriteria = meetsCriteria;
        return html`<li>${this.makeCheckIcon(meetsCriteria)} ${rule.message}</li>`;
      });
    }

    return [];
  }

  /**
   * Makes the check icon if the criteria has been met
   * @param {boolean} meetsCriteria
   * @private
   * @returns {TemplateResult} an icon component
   */
  makeCheckIcon(meetsCriteria: boolean): TemplateResult {
    if (meetsCriteria) {
      return html`<kemet-icon name=${this.icon} size=${this.iconSize}></kemet-icon>`;
    }

    return html``;
  }

  /**
   * Handles the kemet-input-input event
   * @param {*} event
   * @private
   */
  handleInput(event: Event) {
    this.value = (event as CustomEvent).detail.value;
    this.setStrength();
    this.visibility();
  }

  /**
   * Determines the strength of the password
   * @private
   */
  setStrength() {
    // We use a setTimeout here because makeRules adds the meetsCriteria
    // property to the rules. We need that to be set by render() before
    // setting the Strength because the percentage calc is based on it
    setTimeout(() => {
      const totalRules = this.rules.length;
      const metRules = this.rules.filter(rule => rule.meetsCriteria).length;
      const metRulesPercentage = Math.round((metRules / totalRules) * 100) / 100;

      if (metRulesPercentage <= 0.33) {
        this.strength = 'weak';
        this.appearance = EnumAppearances.Error;
      }

      if (metRulesPercentage > 0.33 && metRulesPercentage <= 0.67) {
        this.strength = 'better';
        this.appearance = EnumAppearances.Error;
      }

      if (metRulesPercentage > 0.67) {
        this.strength = 'strong';
        this.appearance = EnumAppearances.Success;
      }

      emitEvent(this, 'kemet-password-strength-change', {
        appearance: this.appearance,
        meetsPasswordCriteria: this.appearance === EnumAppearances.Success,
        element: this,
      });
    }, 1);
  }

  /**
   * Determines whether to show or hide the component
   * @private
   */
  visibility() {
    this.show = this.value.length > 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kemet-password': KemetPassword
  }
}
