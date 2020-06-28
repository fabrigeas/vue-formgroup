# vue-form-group

A vue component input that emulates bootstrap's FormGroup formControl and is-valid

## Demo

* [Codesandbox](https://codesandbox.io/s/github/fabrigeas/vue-formgroup)
* [Demo](https://d04tu.csb.app/)

## Screenshots

![alt text](./screenshot. PNG)

## usage

    npm install @fabrigeas/react-formg-roup

    ## register the component
    src/main.ts
    import 'form-group';

    <template>
      <div id="app">
        {{name}}
          <FormGroup 
            :invalid="name.length < 3"
            :invalidFeedback="'Please fill this field!!'"
            :validFeedback="'looks good!'"
            :model.sync="name"
          />
      </div>
    </template>

    <script>
      import FormGroup from 'vue-FormGroup'

      export default {
        data: ()=>({
          name: ""
        }),
      }
      </script>ync="name"/>
    </template>

## Parameters

### model {String} [required] - The only required property. Used for data binding

    <template>
      {{name}}                  <-- Bound together
      <FormGroup  
        :model.sync="name"      <-- Use .sync for 2-way-binmding
      />
    <template>
    <script>
      export default {
        name: 'App',
        data: ()=>({
          name: ""
        }),

      }
      </script>
    </script>

    <!-- output -->
    <div class="form-group">
      <input 
        type="text" 
        class="form-control is-valid" 
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
      >
    </div>

Update :model manually. This is useful when you want to perform addidional validations

    <template>
      <FormGroup  
        :model="newPassword"
        @update:model="($event)=>validateNewPassword('newPassword', $event)"
      />
    <template>
    <script>
      export default {
        data: ()=>({
          newPassword: "",
          error{
            newPassword: false
          }
        }),
        
        methods: {
          validateNewPassword: function(name, value) {
            this[name] = value;

            const { newPassword, newPassword2, error } = this;
            error[name] = newPassword.length < 2;

          },
        },

      }
      </script>
    </script>

    <!-- output -->
    <div class="form-group">
      <input 
        type="text" 
        class="form-control is-valid" 
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
      >
    </div>

### type {String} [text, date, checkbox, select, textarea, ...] 

text

      <FormGroup 
        :model.sync="Hello"
      />

      <!-- output -->
      <div class="form-group">
        <input 
          type="text" 
          class="form-control is-valid"
          id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
          model="Hello"
        >
      </div>

date (Datepicker)

      <FormGroup 
        type="date"
        :model.sync="23.09.1989"
      />

      <!-- output -->
      <div class="form-group">
        <input 
          type="date" 
          class="form-control is-valid"
          id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
          model="23-09.1989"
        >
      </div>

number

      <FormGroup 
        type="number"
        :model.sync="123"
      />

      <!-- output -->
      <div class="form-group">
        <input 
          type="date" 
          class="form-control is-valid"
          id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
          model="123"
        >
      </div>

checkbox

      <FormGroup 
        type="checkbox"
        :model.sync="male"
      />

      <!-- output -->
      <div class="form-group">
        <input 
          type="checkbox" 
          class="form-control is-valid"
          id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
          model="male"
        >
      </div>

textarea

      <FormGroup 
        type="textarea"
        :model.sync="Some text content"
      />

      <!-- output -->
      <div class="form-group">
        <textarea type="textarea" 
          class="form-control is-valid" 
          id="aed7eeed-4158-4e10-9e25-1d81b65e785c" 
          model="Some text content"></textarea>
      </div>

select

      <FormGroup 
        type="select"
        :model.sync="beta"
      >
        <option value="Alpha">Alpha</option>
        <option value="Beta">Beta</option>
        <option value="Charly">Charly</option>
      </select>

      <!-- output -->
      <div class="form-group">
        <select type="select" class="form-control is-valid" id="79674c60-2648-4a03-b597-2ecc2f932195" model="Beta">     
          <option value="Alpha">Alpha</option>
          <option value="Beta">Beta</option>
          <option value="Charly">Charly</option>
        </select>
      </div>

### label {String} - The label for the input

    <FormGroup 
      :label="'Name'"
      :model.sync="name"
    />

    <!-- output -->
    <div class="form-group">
      <label for="4139c8f6-e922-4160-951d-bc94b6d67eb3" class="form-label">Name:</label> 
      <input 
        type="text" 
        class="form-control is-valid" 
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
      >
    </div>

### invalid {boolean} [default=false] - appends 'is-valid' or 'is-invalid' or input.className 

invalid = true

    <FormGroup 
      :model.sync="name" 
    />

    <!-- output -->
    <div class="form-group">
      <input 
        type="text" 
        class="form-control is-valid"  <-- replaces .is-invalid with .is-valid
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
      >
    </div>

invalid=true

    <FormGroup 
      :model.sync="name" 
      :invalid="true
    />

    <!-- output -->
    <div class="form-group">
      <input 
        type="text" 
        class="form-control is-invalid" 
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
      >
    </div>

### validFeedback {String} [optional] - The text to be displayed if input is valid

Must be combined with [invalid=false](###invalid)

    <FormGroup 
      :model.sync="name" 
      :invalid="name.length < 3"
      :validFeedback="'Perfect!'"
    />

    <!-- output -->
    <div class="form-group">
      <input 
        type="text" 
        class="form-control is-valid"
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
      >
      <div class="valid-feedback">Perfect!</div>
    </div>

### invalidFeedback {String} [optional] - The text to be displayed if input is invalid

Must be combined with [:invalid=true](###invalid)

    <FormGroup 
      :model.sync="name" 
      :invalidFeedback="'Perfect!'"
      :invalid="name.length < 3"
    />

    <!-- output -->
    <div class="form-group">
      <input 
        type="text" 
        class="form-control is-valid"
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
      >
      <div class="invalid-feedback">Perfect!</div>
    </div>

### css {Object} [optional] - css for the input only

    <FormGroup 
      :model.sync="name" 
      :css = {
        "background" : "red !important",
        "padding": "1rem"
      }
    />

    <!-- output -->
    <div class="form-group">
      <input 
        type="text" 
        class="form-control is-valid"
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
        style="background: red;"
      >
    </div>

### classes {String} - classList delimitted by spance or comma

    <FormGroup 
      :model.sync="name" 
      :classes: "alpha, beta, charly delta"
    />

    <!-- output -->
    <div class="form-group">
      <input 
        type="text" 
        class="form-control is-valid alpha beta charly delta"
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
      >
    </div>

### props {Object} - html properties and attributes

    <FormGroup 
      :model.sync="name" 
      :props:{
          placeholder: "Placeholder text",
          autocomplete: "off",
          required: true,
          name:"Sample
        }
    />

    <!-- output -->
    <div class="form-group">
      <input 
        type="text" 
        class="form-control is-valid"
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
        
        placeholder="Placeholder text" 
        autocomplete="off" 
        required="required" 
        name="Sample" 
      >
      
    </div>

### data {Object} - input.dataset

    <FormGroup 
      :model.sync="name" 
      :data = {
        "name" : "fabrigeas",
        "user": "{name: 'fabrice', 'age': '30'}"
      }
    />

    <!-- output -->
    <div class="form-group">
      <input 
        type="text" 
        class="form-control is-valid"
        id="4139c8f6-e922-4160-951d-bc94b6d67eb3" 
        model="some value"
        data-name="fabrigeas"
        data-user="{&quot;name&quot;:&quot;fabrigeas&quot;,&quot;age&quot;:&quot;30&quot;}"
      >
    </div>

### events {Object} - events

## Todo

* Migrate to typescrip
* Implement type=checkbox
* Implement other event types
* Reduce the size of css file by importing only required classes from bootstrap
