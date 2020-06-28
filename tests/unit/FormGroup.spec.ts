import { mount } from "@vue/test-utils";
import FormGroup from "@/components/FormGroup.vue";

describe("FormGroup", () => {
  it("Default should be input[type='text']", () => {
    let model = "initial value";
    const wrapper = mount(FormGroup, {
      propsData: {
        model
      }
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);

    const attributes = input.attributes();
    expect(attributes.type).toBe("text");
    expect(attributes.model).toBe(model);
    expect(attributes.class).toMatch("form-control");
    expect(input.classes("form-control")).toBe(true); // same as above
  });

  it("Should render label", () => {
    let labelValue = "Name";

    const wrapper = mount(FormGroup, {
      propsData: {
        model: "some value",
        label: labelValue
      }
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);

    const label = wrapper.find("label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toMatch(labelValue);
    expect(label.attributes("for")).toBe(input.attributes("id"));
  });

  it("Should create an input with 'is-invalid' class", async () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        model: "initial value",
        invalid: true
      }
    });

    let input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.classes("is-invalid")).toBe(true);
    expect(input.classes("is-valid")).toBe(false);

    await wrapper.setProps({
      invalid: false
    });

    input = wrapper.find("input");
    expect(input.classes("is-valid")).toBe(true);
    expect(input.classes("is-invalid")).toBe(false);
  });

  it("Should create feedbacks", async () => {
    const invalidFeedback = "Please fill the value";
    const validFeedback = "Perfect!";
    const wrapper = mount(FormGroup, {
      propsData: {
        model: "Some value",
        invalidFeedback
      }
    });

    expect(wrapper.find(".invalid-feedback").exists()).toBe(true);
    expect(wrapper.find(".valid-feedback").exists()).toBe(false);

    await wrapper.setProps({
      validFeedback,
      invalidFeedback: null
    });

    expect(wrapper.find(".valid-feedback").exists()).toBe(true);
    expect(wrapper.find(".invalid-feedback").exists()).toBe(false);
  });

  it("Should create a Checkbox", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        type: "checkbox",
        model: "true"
      }
    });

    expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
  });

  it("Should create a DatePicker", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        type: "date",
        model: "23.09.1989"
      }
    });

    const datepicker = wrapper.find("input[type='date']");
    expect(datepicker.exists()).toBe(true);
  });

  it("Should create a NumberPicker", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        type: "number",
        model: "12345"
      }
    });

    expect(wrapper.find("input[type='number']").exists()).toBe(true);
  });

  it("Should create a textarea", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        type: "textarea",
        model: "Hello world"
      }
    });

    const textarea = wrapper.find("textarea");
    expect(textarea.exists()).toBe(true);
  });

  it("Should create a select", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        type: "select",
        model: "Beta"
      },
      slots: {
        default: [
          "<option value='Alpha'>Alpha</option>",
          "<option value='Beta'>Beta</option>",
          "<option value='Charly'>Charly</option>"
        ]
      }
    });

    const select = wrapper.find("select");
    const alpha = wrapper.find("option[value='Alpha']");
    const beta = wrapper.find("option[value='Beta']");

    expect(select.exists()).toBe(true);
    expect(alpha.exists()).toBe(true);
    expect(beta.exists()).toBe(true);
  });

  it("should create a RadioButton", () => {});

  it("Should update input value", async () => {
    const initialValue = "initial value";
    const wrapper = mount(FormGroup, {
      propsData: {
        model: initialValue
      }
    });

    let attributes;
    let input = wrapper.find("input[type='text']");

    expect(input.exists()).toBe(true);

    // before values changed
    attributes = input.attributes();

    expect(attributes.model).toBe(initialValue);
    expect(attributes.class).toMatch("is-valid");

    // update values and re check
    const changedValue = "Value changed";
    await wrapper.setProps({
      model: changedValue,
      invalid: true
    });

    input = wrapper.find("input[type='text']");
    attributes = input.attributes();

    expect(attributes.model).toBe(changedValue);
    expect(attributes.class).toMatch("is-invalid");
  });

  describe("Should accepts value", () => {
    it("should accept string", () => {
      const model = "hello world";
      const wrapper = mount(FormGroup, {
        propsData: {
          model,
          invalid: true
        }
      });

      let input = wrapper.find("input");
      expect(input.exists()).toBe(true);
    });
    it("should accept number", () => {
      const model = 100;
      const type = "number";
      const wrapper = mount(FormGroup, {
        propsData: {
          model,
          type,
          invalid: true
        }
      });

      let input = wrapper.find("input");
      expect(input.exists()).toBe(true);
    });
    it("should accept boolean", () => {
      const model = false;
      const wrapper = mount(FormGroup, {
        propsData: {
          model,
          invalid: true
        }
      });

      let input = wrapper.find("input");
      expect(input.exists()).toBe(true);
    });
  });

  it("Should 3mit 'update:model' when @keyup", async () => {
    const initialValue = "initial value";
    const wrapper = mount(FormGroup, {
      propsData: {
        model: initialValue
      }
    });

    const input = wrapper.find("input");

    expect(input.exists()).toBe(true);

    await input.trigger("keyup", {
      key: "a"
    });

    expect(input.emitted().update).toBeTruthy();
  });

  it("Should accept classes", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        model: "initialValue",
        classes: "alpha, beta, charly delta"
      }
    });

    const attributes = wrapper.find("input").attributes();

    expect(attributes.class).toMatch("alpha beta charly delta");
    expect(attributes.class).toMatch("beta");
    expect(attributes.class).toMatch("charly");
    expect(attributes.class).toMatch("delta");
  });

  it("Should accept html attrs", async () => {
    const placeholder = "Placeholder text";
    const autocomplete = "off";
    const required = true;
    const name = "Sample";

    const wrapper = mount(FormGroup, {
      propsData: {
        model: "initialValue",
        attrs: {
          placeholder,
          autocomplete,
          required,
          name
        }
      }
    });

    const attributes = wrapper.find("input").attributes();

    expect(attributes.placeholder).toBe(placeholder);
    expect(attributes.autocomplete).toBe(autocomplete);
    expect(attributes.name).toBe(name);
    expect(attributes.required).toBe("required");
  });

  it("Should accept data", () => {
    const name = "fabrigeas";
    const user = { name, age: "30" };
    const wrapper = mount(FormGroup, {
      propsData: {
        model: "initialValue",
        data: {
          name,
          user: JSON.stringify(user)
        }
      }
    });

    const attributes = wrapper.find("input").attributes();

    expect(attributes["data-name"]).toBe(name);
    expect(JSON.parse(attributes["data-user"])).toStrictEqual(user);
  });

  describe("Should accept Events", () => {
    it("keydown", async () => {
      const keydown = (event: Event) => {};

      const wrapper = mount(FormGroup, {
        propsData: {
          model: "initialValue",
          events: {
            keydown
          }
        }
      });

      const input = wrapper.find("input");
      const attributes = input.attributes();

      // expect(attributes['data-name']).toBe( name );

      await input.trigger("kedown", { key: "F" });
      expect(input.emitted()).toBeTruthy();
    });
  });

  it("Should accept WARI", () => {});

  it("Should accept css", () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        model: "Some value",
        css: {
          background: "red !important",
          padding: "1rem !important"
        }
      }
    });

    const style = wrapper.find("input").attributes("style");

    expect(style).toMatch("background: red");
    expect(style).toMatch("padding: 1rem");
  });

  describe("Auto validate required inputs", () => {
    it("should be invalid because required", () => {
      const wrapper = mount(FormGroup, {
        propsData: {
          model: "",
          attrs: {
            required: true
          }
        }
      });

      const attributes = wrapper.find("input").attributes();

      expect(attributes.class).toMatch("is-invalid");
    });

    it("Should be valid because not required", () => {
      const wrapper = mount(FormGroup, {
        propsData: {
          model: "",
          attrs: {
            required: false
          }
        }
      });

      const attributes = wrapper.find("input").attributes();

      expect(attributes.class).toMatch("is-valid");
    });
  });
});
