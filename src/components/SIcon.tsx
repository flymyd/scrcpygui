import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SIcon',
  props: {
    icon: { type: String, required: true },
    size: { type: [String, Number], default: '18' },
    slotStyle: { type: [Object, String], default: '' }
  },
  setup(props, ctx) {
    return () => {
      return (
        <div style={{ fontSize: props.size + 'px', display: 'flex', alignItems: 'center', flexDirection: 'row' }} class="s-icon">
          <span class="iconify" style="vertical-align: middle;" data-icon={props.icon}></span>
          <div style={props.slotStyle}>{ctx.slots.default && ctx.slots.default()}</div>
        </div >
      )
    }
  },
});