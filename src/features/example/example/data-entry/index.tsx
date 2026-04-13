"use client";

import { useState } from "react";
import {
  Button,
  Cell,
  Checkbox,
  Divider,
  Input,
  Radio,
  Rate,
  SearchBar,
  Slider,
  Stepper,
  Switch,
  Textarea,
} from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { createStyles } from "@/lib/styles/create-styles";

const useStyles = createStyles((t) => ({
  root: { padding: t.space16, background: t.colorPageBg, color: t.colorText },
  block: {
    marginTop: t.space12,
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    padding: t.space12,
  },
  row: { display: "flex", gap: t.space8, alignItems: "center", flexWrap: "wrap" },
}));

export default function ExampleDataEntry() {
  const styles = useStyles();
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("Input value");
  const [textarea, setTextarea] = useState("Textarea value");
  const [slider, setSlider] = useState(30);
  const [stepper, setStepper] = useState(2);
  const [rate, setRate] = useState(3);
  const [radio, setRadio] = useState("a");
  const [checkbox, setCheckbox] = useState<string[]>(["a"]);
  const [darkLike, setDarkLike] = useState(true);

  return (
    <View className={styles.root}>
      <View className={styles.block}>
        <SearchBar
          value={search}
          onChange={(_, v) => setSearch(v)}
          placeholder="Search..."
        />
        <Divider />
        <Input value={input} onChange={(_, v) => setInput(v)} placeholder="Input" />
        <Divider />
        <Textarea value={textarea} onChange={(_, v) => setTextarea(v)} placeholder="Textarea" />
      </View>

      <View className={styles.block}>
        <Cell.Group bordered={false}>
          <Cell label="Switch" bordered={false}>
            <Switch checked={darkLike} onChange={setDarkLike} platform="ios" />
          </Cell>
        </Cell.Group>
        <Divider />
        <Radio.Group value={radio} onChange={setRadio}>
          <Radio value="a">Radio A</Radio>
          <Radio value="b">Radio B</Radio>
        </Radio.Group>
        <Divider />
        <Checkbox.Group value={checkbox} onChange={setCheckbox}>
          <Checkbox value="a">Checkbox A</Checkbox>
          <Checkbox value="b">Checkbox B</Checkbox>
        </Checkbox.Group>
      </View>

      <View className={styles.block}>
        <Slider
          value={slider}
          onChange={(v) => setSlider(Array.isArray(v) ? v[0] : v)}
        />
        <Divider />
        <Stepper value={stepper} onChange={(v) => v != null && setStepper(v)} />
        <Divider />
        <Rate value={rate} onChange={setRate} />
        <Divider />
        <View className={styles.row}>
          <Button size="mini" type="ghost" onClick={() => setSlider((v) => Math.max(0, v - 10))}>
            Slider -10
          </Button>
          <Button size="mini" type="ghost" onClick={() => setSlider((v) => Math.min(100, v + 10))}>
            Slider +10
          </Button>
        </View>
      </View>
    </View>
  );
}
