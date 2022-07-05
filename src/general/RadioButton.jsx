import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class RadioButton extends React.Component {
    state = {
        value: 'female',
    };

    handleChange = event => {
        console.log("event.target.value", event.target.value)
        this.props.parentCallback(event.target.value);
        this.setState({ value: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Filter By</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender2"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel
                            value="price"
                            control={<Radio color="primary" />}
                            label="Price"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="noRooms"
                            control={<Radio color="primary" />}
                            label="No. Rooms"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="faculty"
                            control={<Radio color="primary" />}
                            label="Faculty"
                            labelPlacement="start"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

RadioButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButton);
