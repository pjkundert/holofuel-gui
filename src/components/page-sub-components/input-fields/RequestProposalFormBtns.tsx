import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
// mui custom style imports
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import { ProposalActionParam } from '../../../utils/types'; //  RequestActionParam, Ledger, ListTransactionsResult , DateTimeString, Address
import OutlinedButton from '../outlined-button/OutlinedButton';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
// import Memo from '../memo/Memo';

type StateKeyType = string | number | symbol | any;
type LabelRef = HTMLElement | null | undefined;

export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  classes: any,
  txType: string,
  showTransferBar: (txType:any) => void,
  invokeTx: (txType:any) => void,
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  recipient: string,
  amount: string,
  notes: string,
  deadline: string,
  // requestIdReference: string
}
// type StateInput = Pick<State, StateKeyType>| null;

class RequestProposalFormBtns extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      recipient: "",
      amount: "",
      notes: "",
      deadline: "",
      // requestIdReference: ""
    };
  }

  el: LabelRef = null;
  handleRef (el: any) { // tslint:disable-line
    this.el = ReactDOM.findDOMNode(el!) as HTMLLabelElement | null;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  handleChange = (name: StateKeyType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("selected event : ", event);
    // console.log("selected name : ", name);
  //TODO: Find a typed solution that allows the following isntead of switch case:
  // The non-ts way:
    // this.setState({
    //   [name]: event.target.value,
    // });
    switch (name) {
      case 'recipient':
        this.setState({
          recipient: event.target.value,
        });
        break;

      case 'amount':
        this.setState({
          amount: event.target.value,
        });
        break;

      case 'notes':
        this.setState({
          notes: event.target.value,
        });
        break;

      case 'deadline':
        this.setState({
          deadline: event.target.value,
        });
        break;

      default:
        return "";
    }
  };

  handleMakePayment = () => {
    const { recipient, amount, deadline, notes } = this.state; // requestIdReference
    const tx_obj: ProposalActionParam = {
      to: recipient,// this will be the payment requestor's AGENT_ADDRESS
      amount,
      notes,
      deadline,
      // request?: requestIdReference
    }
    console.log("propose_tx_obj : ", tx_obj);
    // Now send obj to parent component for API invocation :
    this.props.invokeTx({tx_obj});
  };

  public render() {
    const fullWidth:boolean = true;
    const multiline:boolean = true;
    console.log("Inside the RequestProposalFormBtns...", this.props);

    const { classes, txType } = this.props;
    return (
      <div>
        <div className={classnames(classes.txWrapper, classes.root)}>
          <ul className={classes.flexContainer}>
            <li className={classes.flexItem}>
              <FormControl className={classes.formControl} fullWidth={fullWidth}>
                 <InputLabel
                   htmlFor="recipient-input"
                   classes={{
                     root: classes.root,
                     input: classes.customFormInput,
                     focused: classes.customFormFocused,
                    }}
                  >
                    Transaction Recipient
                  </InputLabel>
                 <Input
                   id="recipient-input"
                   value={this.state.recipient}
                   onChange={this.handleChange('recipient')}
                   aria-describedby="recipient-input-text"
                   classes={{
                     underline: classes.customFormUnderline
                  }}
                 />
                 <FormHelperText id="recipient-input-text">Type in the Recipient ID</FormHelperText>
               </FormControl>
            </li>

            <li className={classes.flexItem}>
              <FormControl className={classes.formControl} fullWidth={fullWidth}>
                 <InputLabel
                   htmlFor="amount-input"
                   classes={{
                      root: classes.root,
                      input: classes.customFormInput,
                      focused: classes.customFormFocused,
                    }}
                  >
                    Transaction Amount
                 </InputLabel>
                 <Input
                   id="amount-input"
                   type="number"
                   value={this.state.amount}
                   onChange={this.handleChange('amount')}
                   aria-describedby="amount-input-number"
                   classes={{
                     underline: classes.customFormUnderline
                   }}
                 />
                 <FormHelperText id="amount-input-text">Type the amount you'll be sending.</FormHelperText>
               </FormControl>
            </li>

            <li className={classes.flexItem}>
              <FormControl className={classes.formControl} variant="outlined" fullWidth={fullWidth}>
                <InputLabel
                  htmlFor="deadline-input"
                  classes={{
                     root: classes.root,
                     input: classes.customFormInput,
                     focused: classes.customFormFocused,
                   }}
                >
                  {/* Transaction Deadline */}
                </InputLabel>
                <Input
                  id="deadline-input"
                  type="date"
                  value={this.state.deadline}
                  onChange={this.handleChange('deadline')}
                  aria-describedby="recipient-input-text"
                  classes={{
                    underline: classes.customFormUnderline
                  }}
                />
                <FormHelperText id="deadline-input">Type in the transaction cut-off date</FormHelperText>
              </FormControl>
            </li>
           {/* </ul>
         </div>

          <div className={classnames(classes.txWrapper, classes.root)}>
            <ul className={classes.flexContainer}> */}
            <li className={classes.flexItem}>
              <FormControl className={classes.formControl} variant="outlined" fullWidth={fullWidth}>
                <InputLabel
                  htmlFor="notes-input"
                  classes={{
                     root: classes.root,
                     input: classes.customFormInput,
                     focused: classes.customFormFocused,
                   }}
                >
                  Transaction Notes
                </InputLabel>
                <OutlinedInput
                  id="notes-input"
                  multiline={multiline}
                  rows="4"
                  value={this.state.notes}
                  onChange={this.handleChange('notes')}
                  labelWidth={this.el ? this.el.offsetWidth : 3}
                  classes={{
                    root: classes.root,
                    input: classes.customFormOutlinedInput,
                    focused: classes.customFormFocused
                 }}
                />
                <FormHelperText id="notes-input">Describe a few details about your transaction</FormHelperText>
              </FormControl>
            </li>
          </ul>
        </div>

        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar className={classes.toolbar}>
            <div className={classnames(classes.buttonMenu)}>
              {txType === "proposal" ?
              <span>
                <Button variant="outlined"
                  color="primary"
                  onClick={this.handleMakePayment}
                  className={classnames(classes.button, classes.overlayTop)}
                 >
                  <span className={classes.innerBtnText}>Send</span>
                </Button>

                <OutlinedButton
                  text="Cancel"
                  olor="primary"
                  link="/holofuelsummary"
                  showTransferBar={this.props.showTransferBar}
                  fnName=""
                />
              </span>
              :
              <span>
                <Button variant="outlined"
                  color="primary"
                  onClick={this.handleMakePayment}
                  className={classnames(classes.button, classes.overlayTop)}
                 >
                  <span className={classes.innerBtnText}>Request</span>
                </Button>

                <OutlinedButton
                  text="Cancel"
                  color="primary"
                  link="/holofuelsummary"
                  showTransferBar={this.props.showTransferBar}
                  fnName=""
                />
              </span>
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(RequestProposalFormBtns);
// {/* ref={el => {this.handleRef(el)}} */}