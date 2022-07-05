import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import RadioButton from './RadioButton';

class MeniuRadio extends React.Component {
    state = {
        anchorEl: null,
        value: ""
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleCallback = (childData) => {
        this.props.parentCallback(childData);
        this.setState({ value: childData });
    }

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Filter By {this.state.value}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem>
                        <RadioButton parentCallback={this.handleCallback}></RadioButton>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default MeniuRadio;
