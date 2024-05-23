import { FocusEvent, KeyboardEvent } from "react";

export function contentEditableMutation<
  MutationFunction extends (args: any) => any,
  MutationInput extends Parameters<MutationFunction>[0],
  MutationKey extends keyof MutationInput,
>(
  updateMutation: MutationFunction,
  updateVariableKey: MutationKey,
  defaultValue: string = "Untitled",
) {
  return {
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: (d: FocusEvent<HTMLElement, Element>) => {
      const el = d.currentTarget;
      if (!el) return;
      el.textContent = el.textContent?.toString().trim() || defaultValue;
      updateMutation({ [updateVariableKey]: el.textContent });
    },
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
  };
}
