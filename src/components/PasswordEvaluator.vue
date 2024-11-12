<template>
  <div class="password-strength">
    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h1>Welcome to Password Evaluator!</h1>
        <p>Read the instructions carefully before beginning:</p>
        <ul class="instructions-list">
          <li>✔ Password must be at least 8 characters long.</li>
          <li>✔ Password must contain uppercase and lowercase letters.</li>
          <li>✔ It must have at least one number and one special character.</li>
          <li>✔ Do not use your username in your password.</li>
          <li>✔ Avoid using common passwords.</li>
        </ul>
        <button @click="startEvaluation">Continue</button>
      </div>
    </div>

    <div v-else class="main-content">
      <h1>Password Evaluator</h1>

      <input v-model="username" type="text" placeholder="Enter your username" @input="clearMessages"
        class="usernameField" />

      <div class="password-field">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password"
          @input="clearMessages" />
        <span @click="togglePasswordVisibility" class="show-hide-password">
          {{ showPassword ? "Hide" : "Show" }}
        </span>
      </div>

      <button @click="testPassword">Test</button>

      <p v-if="message" class="message">{{ message }}</p>

      <div v-if="feedback">
        <p>Password Strength: {{ feedback.grade }}</p>
        <p>Score: {{ feedback.passwordGrade }}/10</p>

        <p v-if="feedback.messages.length">Criteria:</p>
        <ol>
          <li v-for="(suggestion, index) in feedback.messages" :key="index">
            <span class="incorrect">✘</span> {{ suggestion.text }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { evaluateFunction } from "../helpers/evaluateFunction";

export default {
  data() {
    return {
      username: "",
      password: "",
      feedback: null,
      message: "",
      showPassword: false,
      showModal: true,
    };
  },
  methods: {
    startEvaluation() {
      this.showModal = false;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    clearMessages() {
      this.message = "";
      this.feedback = null;
    },
    testPassword() {
      if (!this.username || !this.password) {
        this.message = "Please enter both username and password.";
        return;
      }

      this.feedback = evaluateFunction(this.password, this.username);

      this.feedback.messages = this.feedback.messages.map((msg) => {
        return {
          text: msg,
          correct: !msg.includes("must"),
        };
      });
    },
  },
};
</script>

<style scoped>
.password-strength {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
}

.main-content {
  text-align: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

input {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input.usernameField {
  width: 95%;
}

.password-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.show-hide-password {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  color: #007bff;
}

button {
  padding: 10px 15px;
  cursor: pointer;
  background-color: #04072f;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
  font-weight: bolder;
}

button:hover {
  background-color: #04072f;
}

.message {
  color: red;
  margin-top: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  max-width: 500px;
  text-align: left;
  width: 100%;
}

.instructions-list {
  margin-left: 20px;
}

.incorrect {
  color: red;
}

ol {
  list-style-type: none;
}

ul {
  list-style-type: none;
}
</style>
