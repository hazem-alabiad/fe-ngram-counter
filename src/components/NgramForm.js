import {
  Button,
  Card,
  CardActions,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { useForm } from "react-hook-form";
import { MY_MESSAGES } from "src/utils/constants";
import CreateIcon from "@material-ui/icons/Create";

// ####################################################
// ##################    Helpers    ###################
// ####################################################
const renderError = (error, msg: String) =>
  error ? <Alert severity="error">{msg}</Alert> : "";

const isSubmitDisabled = (formState) => {
  if (formState.isSubmitting) return true;
  return formState.isValid ? false : true;
};

// ####################################################
// ###############    Main Component    ###############
// ####################################################
const NgramForm = () => {
  // ###############    State   ###############
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange",
  });

  // #############    handlers   ##############
  const onSubmit = (data) => reset();

  return (
    <Card style={{ marginTop: "2rem" }}>
      <CardHeader title="N-Gram Counter" />
      <CardActions>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                inputRef={register({ required: true })}
                name="body"
                label="Body"
                variant="outlined"
                margin="dense"
                fullWidth={true}
                helperText="String containing the text input"
                multiline
                rows={3}
                error={errors.body ? true : false}
              />
              {renderError(errors.body, MY_MESSAGES.required)}
            </Grid>
            <Grid item>
              <FormControl fullWidth={true}>
                <InputLabel id="caseSensitive">Case Sensitive</InputLabel>
                <Select
                  inputRef={register({
                    name: "caseSensitive",
                    value: "true",
                  })}
                  labelId="caseSensitive"
                  defaultValue="true"
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>
                <FormHelperText>
                  Boolean indicating whether we want to treat the input as such
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                inputRef={register({ min: 1 })}
                name="ngram"
                label="N-Gram"
                variant="outlined"
                margin="dense"
                fullWidth={true}
                helperText="Positive number indicating the sequence length"
                defaultValue="1"
                error={errors.ngram ? true : false}
              />
              {renderError(errors.ngram, MY_MESSAGES.positive)}
            </Grid>
            <Grid item>
              <TextField
                inputRef={register}
                name="length"
                label="Length"
                variant="outlined"
                margin="dense"
                fullWidth={true}
                helperText="Non-negative number indicating the maximum length of the sorted
            list of n-grams to return"
                defaultValue="100"
                error={errors.length ? true : false}
              />
              {renderError(errors.length, MY_MESSAGES.positive)}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<SendIcon />}
                disabled={isSubmitDisabled(formState)}
              >
                Submit
              </Button>
            </Grid>
            <Grid item>
              {formState.isSubmitSuccessful &&
              !formState.isValid &&
              formState.touched ? (
                <Alert severity="success">{MY_MESSAGES.success}</Alert>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </form>
      </CardActions>
    </Card>
  );
};

export default NgramForm;
