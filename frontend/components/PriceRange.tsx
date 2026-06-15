"use client";
import * as Slider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import PriceInput from "./PriceInput";
import LineIcon from "@/assets/icons/line.svg?react";

type PriceRangeProps = {
  min: number;
  max: number;
  value?: [number, number];
  dark?: boolean;
  onChange?: (value: [number, number]) => void;
};

export default function PriceRange({
  min,
  max,
  value: controlledValue,
  onChange,
  dark,
}: PriceRangeProps) {
  const [value, setValue] = useState<[number, number]>(
    controlledValue ?? [min, max],
  );

  const handleLocalChange = (newValue: [number, number]) => {
    setValue(newValue);
  };

  const handleCommit = (newValue: [number, number]) => {
    onChange?.(newValue);
  };

  useEffect(() => {
    if (controlledValue) {
      setValue(controlledValue);
    } else {
      setValue([min, max]);
    }
  }, [controlledValue, min, max]);

  const theme = {
    input: dark ? "bg-card-dark text-main" : "bg-main text-card-dark",
    thumb: dark ? "bg-surface-accent" : "bg-main",
    track: dark ? "bg-card-dark" : "bg-main",
    line: dark ? "text-card-dark" : "text-main",
  };

  return (
    <>
      <div
        className={`flex gap-[10px] text-[14px] ${
          dark ? "justify-center" : ""
        }`}
      >
        <PriceInput
          value={value[0]}
          onChange={(e) => {
            const next: [number, number] = [Number(e.target.value), value[1]];

            setValue(next);
            onChange?.(next);
          }}
          className={theme.input}
        />
        <LineIcon className={`w-[12px] h-[12px] self-center ${theme.line}`} />
        <PriceInput
          value={value[1]}
          onChange={(e) => {
            const next: [number, number] = [value[0], Number(e.target.value)];

            setValue(next);
            onChange?.(next);
          }}
          className={theme.input}
        />
        <input type="checkbox" />
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-[20px]"
        min={min}
        max={max}
        value={value}
        onValueChange={handleLocalChange}
        onValueCommit={handleCommit}
      >
        <Slider.Track
          className={`${theme.track} relative grow rounded-full h-[3px]`}
        >
          <Slider.Range
            className={`${theme.track} absolute rounded-full h-full`}
          />
        </Slider.Track>
        <Slider.Thumb
          className={`block w-[27px] h-[27px] rounded-full ${theme.thumb}`}
        />
        <Slider.Thumb
          className={`block w-[27px] h-[27px] rounded-full ${theme.thumb}`}
        />
      </Slider.Root>
    </>
  );
}
