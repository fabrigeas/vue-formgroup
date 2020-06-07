import { mount } from "@vue/test-utils";
import FormGroup from "@/components/formGroup";

describe("formGroup", () => {

  it("Default should be 'input'", () => {
    let model = "initial value";
    const wrapper = mount(FormGroup, {
      propsData: {
        model,
      },
    });

    expect(wrapper.contains("input[type='text']")).toBe(true);

    const input = wrapper.find("input");
    const attributes = input.attributes();

    expect(attributes.type).toBe("text");
    expect(attributes.model).toBe(model);
    expect(attributes.class).toMatch("form-control");
    expect(input.classes("form-control")).toBe(true); // same as above
  });

  it("Should create an input with label", () => {
    let modelValue = "initial value";
    let labelValue = "Name";

    const wrapper = mount(FormGroup, {
      propsData: {
        model: modelValue,
        label: labelValue,
      },
    });

    expect(wrapper.contains("input")).toBe(true);
    expect(wrapper.contains("label")).toBe(true);

    const input = wrapper.find("input");
    const label = wrapper.find("label");

    expect(label.text()).toMatch(labelValue);
    expect(label.attributes("for")).toBe(input.attributes("id"));
  });

  it("Should create an input with 'is-invalid' class", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        model: "initial value",
        error: true,
      },
    });

    expect(wrapper.contains("input")).toBe(true);
    expect(wrapper.find("input").attributes().class).toMatch("is-invalid");
  });

  it("Should create an input with 'errorMessage'", () => {
    const errorMessage = "Please fill the value";
    const successMessage = "Perfect!";
    const wrapper = mount(FormGroup, {
      propsData: {
        model: "initial value",
        error: true,
        errorMessage,
        successMessage,
      },
    });

    expect(wrapper.contains("input")).toBe(true);
    expect(wrapper.contains(".valid-feedback")).toBe(true);
    expect(wrapper.contains(".invalid-feedback")).toBe(true);
    expect(wrapper.find("input").attributes().class).toMatch("is-invalid");
  });

  it("Should create a textarea", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        type: "textarea",
        model: "hello world",
      },
    });

    expect(wrapper.contains("textarea")).toBe(true);
    expect(wrapper.contains("input")).toBe(false);
  });

  it("Should create a checkbox", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        type: "checkbox",
        model: "hello world",
      },
    });

    expect(wrapper.contains("input")).toBe(true);
    expect(wrapper.contains("input[type='checkbox']")).toBe(true);
  });

  it("Should create a datePicker", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        type: "date",
        model: "23.09.1989",
      },
    });

    expect(wrapper.contains("input")).toBe(true);
    expect(wrapper.contains("input[type='date']")).toBe(true);
  });

  it("Should create a select", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        type: "select",
        model: "Beta",
      },
      slots: {
        default: [
          "<option>Alpha</option>",
          "<option>Beta</option>",
          "<option>Charly</option>",
        ],
      },
    });

    expect(wrapper.contains("select")).toBe(true);
    expect(wrapper.contains("input")).toBe(false);
  });

  it("Should update input value", async () => {
    let attributes;
    const initialValue = "initial value";
    const wrapper = mount(FormGroup, {
      propsData: {
        model: initialValue,
      },
    });

    expect(wrapper.contains("input")).toBe(true);
    expect(wrapper.contains("input[type='text']")).toBe(true);

    // before values changed
    attributes = wrapper.find("input").attributes();

    expect(attributes.model).toBe(initialValue);
    expect(attributes.class).toMatch("is-valid");

    // update values and re check
    const changedValue = "Value changed";
    await wrapper.setProps({
      model: changedValue,
      error: true,
    });

    attributes = wrapper.find("input").attributes();

    expect(attributes.model).toBe(changedValue);
    expect(attributes.class).toMatch("is-invalid");
  });

  it("Should bind 2-ways", async () => {
    const initialValue = "initial value";
    const wrapper = mount(FormGroup, {
      propsData: {
        model: initialValue,
      },
    });

    expect(wrapper.contains("input")).toBe(true);
    expect(wrapper.contains("input[type='text']")).toBe(true);

    const input = wrapper.find("input");

    await input.trigger("keyup", {
      key: "a",
    });
    expect(input.emitted().update).toBeTruthy();
  });

  it("keyup should $emit @update", () => {});

  it("Should accept classes", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        model: "initialValue",
        classes: "alpha, beta, charly delta",
      },
    });

    const attributes = wrapper.find("input").attributes();

    expect(attributes.class).toMatch("alpha beta charly delta");
    expect(attributes.class).toMatch("beta");
    expect(attributes.class).toMatch("charly");
    expect(attributes.class).toMatch("delta");
  });

  it("Should accept other html attributes and properties", async () => {

    const placeholder = "Placeholder text";
    const autocomplete = "off";
    const required = true;
    const name = "Sample";

    const wrapper = mount(FormGroup, {
      propsData: {
        model: "initialValue",
        props:{
          placeholder,
          autocomplete,
          required,
          name
        }
      },
    });

    const attributes = wrapper.find("input").attributes();

    expect(attributes.placeholder).toBe( placeholder );
    expect(attributes.autocomplete).toBe( autocomplete );
    expect(attributes.name).toBe( name );
    expect(attributes.required).toBe( "required" );

  });

  it("Should accept dataset", () => {

    const name = "fabrigeas";
    const user = {name: "Feugang", age: "30"};
    const wrapper = mount(FormGroup, {
      propsData: {
        model: "initialValue",
        data: {
          name,
          user: JSON.stringify(user)
        }
      },
    });

    const attributes = wrapper.find("input").attributes();

    expect(attributes['data-name']).toBe( name );
    expect(JSON.parse(attributes['data-user']) ).toStrictEqual( user );

  });

  describe("Should accept Events", () => {

    it("keydown", async () => {

      const keydown = (event) => {
        console.log(event)
      };

      const wrapper = mount(FormGroup, {
        propsData: {
          model: "initialValue",
          events: {
            keydown
          }
        },
      });
  
      const input = wrapper.find("input");
      const attributes = input.attributes();
  
      // expect(attributes['data-name']).toBe( name );
      
      await input.trigger("kedown", {key: "F"});
      expect( input.emitted() ).toBeTruthy()
      

    });
  });

  it("Should accept WARI", () => {});

  it("Should accept style", () => {});
});
