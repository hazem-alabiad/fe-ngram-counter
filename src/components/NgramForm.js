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
import { navigate } from "@reach/router";
import { isEmpty } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { _MESSAGES } from "src/constants/messages";
import { _ROUTERS } from "src/constants/routes";
import { apiGetNgramCounts } from "../api/index";

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
const NgramForm = ({ setNgramCounts }) => {
  // ###############    State   ###############
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange",
  });

  // #############    handlers   ##############
  const onSubmit = (data) => {
    // API call
    apiGetNgramCounts(data).then((data) => {
      setNgramCounts(data);
      // go to view
      navigate(_ROUTERS.view);
    });
    reset();
  };

  return (
    <Card style={{ marginTop: "2rem" }}>
      <CardHeader title="N-Gram Counter" />
      <CardActions>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" spacing={1}>
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
              {renderError(errors.body, _MESSAGES.required)}
            </Grid>
            <Grid item>
              <FormControl fullWidth={true}>
                <InputLabel id="case_sensitive">Case Sensitive</InputLabel>
                <Select
                  inputRef={register({
                    name: "case_sensitive",
                    value: true,
                  })}
                  labelId="case_sensitive"
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
                _MESSAGES.positive
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
                _MESSAGES.positive
              )}
            </Grid>
            <Grid item>
              {formState.isSubmitSuccessful &&
              !formState.isValid &&
              isEmpty(formState.dirtyFields) ? (
                <Alert severity="success">{_MESSAGES.success}</Alert>
              ) : (
                ""
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
          </Grid>
        </form>
      </CardActions>
    </Card>
  );
};

export default NgramForm;
