import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SIcon',
  props: {
    icon: { type: String, required: true },
    size: { type: [String, Number], default: '18' },
  },
  setup(props) {
    return () => {
      return (
        <span style={{ fontSize: props.size + 'px' }} class="s-icon">
          <span class="iconify" style="vertical-align: middle;" data-icon={props.icon}></span>
        </span>
      )
    }
  },
});