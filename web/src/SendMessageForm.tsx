import {
  Stack,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";
import { FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { EntireMessage } from "./hooks/useChatRoomClient";

export const SendMessageForm: FC<{
  control: Control<EntireMessage>;
  register: UseFormRegister<EntireMessage>;
  errors: FieldErrors<EntireMessage>;
  onSubmit: () => void;
}> = ({ control, errors, register, onSubmit }) => {
  const type = useWatch({ control, name: "type" });
  return (
    <form onSubmit={onSubmit}>
      <Stack gap={2} direction="row" sx={{ minWidth: "0" }}>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select label="Type" value={field.value} onChange={field.onChange}>
              <MenuItem value="message">Message</MenuItem>
              <MenuItem value="direct">Direct Message</MenuItem>
            </Select>
          )}
        />
        {type === "direct" && (
          <Stack>
            <TextField label="to" {...register("to")} />
            {errors.to && (
              <FormHelperText error>{errors.to.message}</FormHelperText>
            )}
          </Stack>
        )}
        <Stack flexGrow={1}>
          <TextField label="body" {...register("body")} />
          {errors.body && (
            <FormHelperText error>{errors.body.message}</FormHelperText>
          )}
        </Stack>
        <Button type="submit">Send</Button>
      </Stack>
    </form>
  );
};
