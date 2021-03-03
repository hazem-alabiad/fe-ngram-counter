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
  TextField
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Alert from "@material-ui/lab/Alert";
import { isEmpty } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { MY_MESSAGES } from "src/utils/constants";

// ####################################################
// ##################    Helpers    ###################
// ####################################################
const renderError = (error, msg: String) =>
  error ? <Alert severity="error">{msg}</Alert> : "";

const isSubmitDisabled = (formState) => {
  if (formState.isSubmitting) return true;
  return formState.isValid ? false : true;
};

const renderTextField = (
  register: Object,
  name: String,
  label: String,
  helperText: String,
  defaultValue: String,
  errorObj: Object,
  errorMsg: String
) => (
  <>
    <TextField
      inputRef={register({ min: 1 })}
      name={name}
      label={label}
      variant="outlined"
      margin="normal"
      fullWidth={true}
      helperText={helperText}
      defaultValue={defaultValue}
      error={errorObj ? true : false}
    />
    {renderError(errorObj, errorMsg)}
  </>
);

// ####################################################
// ###############    Main Component    ###############
// ####################################################
const NgramForm = () => {
  // ###############    State   ###############
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange",
  });

  // #############    handlers   ##############
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  console.log(formState.dirtyFields);
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
                    value: true,
                  })}
                  labelId="caseSensitive"
                  defaultValue={true}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
                <FormHelperText>
                  Boolean indicating whether we want to treat the input as such
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              {renderTextField(
                register,
                "ngram",
                "N-Gram",
                `Positive number indicating the sequence length`,
                1,
                errors.ngram,
                MY_MESSAGES.positive
              )}
            </Grid>
            <Grid item>
              {renderTextField(
                register,
                "length",
                "Length",
                `Non-negative number indicating the 
              maximum length of the sorted list of n-grams to return`,
                100,
                errors.length,
                MY_MESSAGES.positive
              )}
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
              isEmpty(formState.dirtyFields) ? (
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
