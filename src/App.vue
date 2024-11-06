<script setup lang="ts">
/**
 * dSonic SIN Card Validator
 *
 *
 * This application is capable of validating a SIN card by entering the SIN in an input box by the user.
 *
 * To make UI a little bit cleaner, the SIN will be validated immediately when the user has pressed
 * the Enter key or click anywhere outside of the SIN input box after typing.
 *
 * Once the SIN is validated, a Dialog box will be shown to tell the user if the SIN is valid or not.
 *
 *
 */
import { ref } from 'vue'
import type { Ref } from 'vue'
import SinInput from './components/SinInput.vue'

const sinNumber: Ref<string> = ref('')
const dialog: Ref<boolean> = ref(false)
const validSinNumber: Ref<boolean> = ref(false)

/**
 * Gets called when user enter a character in the SIN Number input field
 *
 * To prevent user from entering non numeric characters
 *
 * @param {KeyboardEvent} event The vue `KyeboardEvent`
 */
const checkForNumberKeys = ($event: KeyboardEvent): void => {
  const keysAllowed: string[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ]
  const keyPressed: string = $event.key

  if (!keysAllowed.includes(keyPressed)) {
    $event.preventDefault()
  }
}

/**
 * Validate the SIN Number
 *
 * A vaild SIN Number must be following the rules below
 *
 * 1. Must be exactly 9 digits
 *
 * 2. Start from the second digit, double every alternate digit in the SIN.
 * If doubling a digit results in a number greater than 9, add the digits of that number
 * together (e.g. 16 becomes 1 + 6).
 *
 * 3. Sum all the digits up from step 2
 *
 * 4. Divide the sum from step 3 by 10, it's a valid SIN if there is no remainder, otherewise, it's
 * an invalid SIN
 *
 * @param {string} sinNumber The SIN Number
 */
const validateSinNumber = (sinNumber: string): boolean => {
  if (sinNumber.length < 9) {
    return false
  }

  const sinNumberArray: number[] = sinNumber
    .split('')
    .map((value: string) => parseInt(value))

  const sumOfSinNumberDigits: number = sinNumberArray.reduce(
    (accumulator, currentValue, currentIndex) => {
      if (currentIndex % 2 !== 0) {
        const doubledValue = currentValue * 2

        if (doubledValue > 9) {
          const splitedDoubledValue: number[] = doubledValue
            .toString()
            .split('')
            .map(Number)

          return accumulator + splitedDoubledValue.reduce((a, v) => a + v)
        }

        return accumulator + doubledValue
      }

      return accumulator + currentValue
    },
  )

  return sumOfSinNumberDigits % 10 === 0
}

/**
 * Gets called when user pressed the Enter key or click on anywhere
 * outside of the SIN input box after entering the digits
 *
 * 1. Update the sinNumber state
 * 2.
 *
 * @param {Event} event The vue `Event` object
 */
const updateSinNumber = (event: Event): void => {
  const inputElement = event.target as HTMLInputElement
  inputElement.blur()
  sinNumber.value = inputElement.value

  validSinNumber.value = validateSinNumber(sinNumber.value)

  dialog.value = true
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="d-flex justify-center mb-6">
          <p class="text-h3" style="font-weight: bold; font-style: italic">
            dSonic SIN Card Validator
          </p>
        </div>

        <SinInput
          :sin-number="sinNumber"
          @update-sin-number="updateSinNumber"
          @check-for-number-keys="checkForNumberKeys"
        />
      </v-container>

      <div class="text-center pa-4">
        <v-dialog v-model="dialog" width="auto" class="dialog">
          <v-card max-width="400">
            <v-card-text class="dialog-text" v-if="validSinNumber">
              <v-icon color="success" icon="$vuetify" size="x-large"></v-icon>
              Valid SIN Number...
            </v-card-text>
            <v-card-text class="dialog-text" v-else>
              <v-icon color="error" icon="$vuetify" size="x-large"></v-icon>
              Invalid SIN Number...
            </v-card-text>
            <template v-slot:actions>
              <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.sin-card-holder {
  background-image: url('/sin-card.png');
  background-size: cover;
  width: 770px;
  height: 480px;
}

input[type='text'] {
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 37px;
  margin-top: 319px;
  margin-left: 130px;
  color: black;
}
</style>
