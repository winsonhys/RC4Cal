import { connect } from "react-redux";
import LoginPage from "./Login";
import { getUser } from "./redux";

const mapStateToProps = state => ({
  loggingIn: state.user.getting
});
const mapDispatchToProps = { getUser };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
