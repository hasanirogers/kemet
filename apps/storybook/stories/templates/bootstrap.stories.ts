import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import '../../../../packages/ui/src/elements/button';
import '../../../../packages/ui/src/elements/field';
import '../../../../packages/ui/src/elements/input';
import '../../../../packages/ui/src/elements/toggle';
import '../../../../packages/ui/src/elements/select';
import '../../../../packages/ui/src/elements/select-option';
import '../../../../packages/ui/src/elements/radio';
import '../../../../packages/ui/src/elements/radios';
import '../../../../packages/ui/src/elements/badge';
import '../../../../packages/ui/src/elements/icon';

const meta: Meta = {
  title: 'Templates / Bootstrap',
};
export default meta;

type Story = StoryObj;

const handleFormSubmit = (event: { preventDefault: () => void; srcElement: any; }) => {
  console.log('Form submitted');
  event.preventDefault();
  const form = event.srcElement;
  const formData = new FormData(form) as any;

  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
};

const CheckoutTemplate = () => html`
  <style>
    main {
      max-width: 1280px;

      & > header {
        text-align: center;
      }

      & > footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 2rem;
        border-top: 1px solid;

        menu {
          display: flex;
          gap: 1rem;
          list-style: none;
        }
      }
    }

    section {
      display: grid;
      gap: 2rem;
      grid-template-columns: 3fr 1fr;
    }

    aside {
      header {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        border-radius: 0.5rem;
        border: 1px solid lightgray;
      }

      li {
        margin-top: 1rem;
        padding: 0rem 1rem 2rem 1rem;
        border-bottom: 1px solid lightgray;

        &:last-child {
          border-bottom: none;
        }
      }
    }

    kemet-field {
      margin-bottom: 1.5rem;
    }

    .names {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
    }

    .location {
      display: grid;
      gap: 1rem;
      grid-template-columns: 2fr 1fr 1fr;
    }

    .information {
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      margin-bottom: 2rem;
    }

    .payment {
      display: grid;
      gap: 1rem;
      grid-template-columns: 2fr 2fr 1fr 1fr;
    }
  </style>
  <main data-kemet="margin:auto padding:lg">
    <header>
      <kemet-icon name="cart3" size="128" kemet-color="white" kemet-border-radius="lg" kemet-background-color="primary" kemet-padding="lg"></kemet-icon>
      <h1 data-kemet="margin:2xl">Checkout Form</h1>
      <p data-kemet="text:lg padding:left-3xl padding:right-3xl">This form is a recreation of Bootstrap's Checkout example. It's been recreated using Kemet UI Core API styles and components. It serves as an example of doing validation with web components using Kemet UI.</p>
    </header>
    <section data-kemet="margin:top-2xl">
      <form novalidate data-kemet="margin:top-2xl" @submit=${(event: { preventDefault: () => void; srcElement: any; }) => handleFormSubmit(event)}>
        <h2>Billing address</h2>
        <div class="names">
          <kemet-field slug="first-name" label="First Name*" message="First name is required.">
            <kemet-input required slot="input" name="first-name" rounded></kemet-input>
          </kemet-field>
          <kemet-field slug="last-name" label="Last Name*" message="Last name is required.">
            <kemet-input required slot="input" name="last-name" rounded></kemet-input>
          </kemet-field>
        </div>
        <kemet-field slug="username" label="Username*" message="Username is required.">
          <kemet-input required slot="input" name="username" rounded>
            <kemet-icon name="person-fill" slot="left"></kemet-icon>
          </kemet-input>
        </kemet-field>
        <kemet-field slug="email" label="Email*" message="Invalid email.">
          <kemet-input required slot="input" type="email" name="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" rounded>
            <kemet-icon name="envelope-fill" slot="left"></kemet-icon>
          </kemet-input>
        </kemet-field>
        <kemet-field slug="address" label="Address*" message="Address is required.">
          <kemet-input required slot="input" name="address" rounded>
            <kemet-icon name="geo-alt-fill" slot="left"></kemet-icon>
          </kemet-input>
        </kemet-field>
        <kemet-field slug="address2" label="Address 2">
          <kemet-input slot="input" name="address2" rounded>
            <kemet-icon name="geo-alt-fill" slot="left"></kemet-icon>
          </kemet-input>
        </kemet-field>
        <div class="location">
          <kemet-field slug="country" label="Country*" message="Country is required.">
            <kemet-select required slot="input" name="country" rounded>
              <kemet-select-option></kemet-select-option>
              <kemet-select-option value="usa" label="United States"></kemet-select-option>
              <kemet-select-option value="canada" label="Canada"></kemet-select-option>
              <kemet-select-option value="mexico" label="Mexico"></kemet-select-option>
            </kemet-select>
          </kemet-field>
          <kemet-field slug="state" label="State*" message="State is required.">
            <kemet-select required slot="input" name="state" rounded>
              <kemet-select-option></kemet-select-option>
              <kemet-select-option value="MI" label="Michigan"></kemet-select-option>
              <kemet-select-option value="NY" label="New York"></kemet-select-option>
              <kemet-select-option value="CA" label="California"></kemet-select-option>
            </kemet-select>
          </kemet-field>
          <kemet-field slug="zipcode" label="ZipCode*" message="ZipCode is required.">
            <kemet-input required slot="input" name="zipcode" rounded></kemet-input>
          </kemet-field>
        </div>
        <br /><hr /><br />

        <div class="information">
          <kemet-toggle name="same-address" label="Shipping address is the same as my billing address"></kemet-toggle>
          <kemet-toggle name="save-information" label="Save this information for next time"></kemet-toggle>
        </div>
        <hr />
        <h2>Payment</h2>
        <kemet-radios required name="payment" message="You must select a payment type." data-kemet="margin:top-xl margin:bottom-xl">
          <kemet-radio value="credit-card" label="Credit Card"></kemet-radio>
          <kemet-radio value="debit-card" label="Debit Card"></kemet-radio>
          <kemet-radio value="pay-pay" label="PayPal"></kemet-radio>
        </kemet-radios>
        <div class="payment">
          <kemet-field slug="name-on-card" label="Name on card*" message="Name is required.">
            <kemet-input required slot="input" name="name-on-card" rounded>
              <kemet-icon name="person-fill" slot="left"></kemet-icon>
            </kemet-input>
          </kemet-field>
          <kemet-field slug="credit-card-number" label="Credit card number*" message="Credit card is required.">
            <kemet-input required slot="input" name="credit-card-number" rounded>
              <kemet-icon name="credit-card" slot="left"></kemet-icon>
            </kemet-input>
          </kemet-field>
          <kemet-field slug="expiration" label="Expiration*" message="Expiration is not valid.">
            <kemet-input required slot="input" name="address" rounded></kemet-input>
          </kemet-field>
          <kemet-field slug="cvv" label="CVV*" message="CVV is not valid.">
            <kemet-input required slot="input" name="cvv" rounded></kemet-input>
          </kemet-field>
        </div>
        <kemet-checkbox required filled rounded name="terms" label="Do you agree to our terms of service?" message="You must agree to the terms."></kemet-checkbox>
        <br /><hr /><br />
        <kemet-button type="submit" appearance="brand" rounded>CONTINUE TO CHECKOUT</kemet-button>
      </form>
      <aside>
        <header>
          <h2>Your cart</h2>
          <div>
            <kemet-badge appearance="neutral" rounded="circle">3</kemet-badge>
          </div>
        </header>
        <ul>
          <li>
            <div>
              <div>
                <h3>Product Name</h3>
                <span>Brief description</span>
              </div>
              <span>$12</span>
            </div>
          </li>
          <li>
            <div>
              <div>
                <h3>Second product</h3>
                <span>Brief description</span>
              </div>
              <span>$8</span>
            </div>
          </li>
          <li>
            <div>
              <div>
                <h3>Third item</h3>
                <span>Brief description</span>
              </div>
              <span>$8</span>
            </div>
          </li>
          <li>
            <div>
              <div>
                <h3>Promo code</h3>
                <span>EXAMPLE CODE</span>
              </div>
              <span> -$5</span>
            </div>
          </li>
          <li>
            <div>
              <h3>Total (USD)</h3>
              <strong>$20</strong>
            </div>
          </li>
        </ul>
      </aside>
    </section>
    <footer kemet-type-align="center">
      <p>&copy; 2026 Company Name</p>
      <menu>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Terms</a></li>
        <li><a href="#">Support</a></li>
      </menu>
    </footer>
  </main>
`;

export const Checkout: Story = {
  render: CheckoutTemplate,
}
