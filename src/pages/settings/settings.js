import { connect } from "react-redux";

function Settings(props) {
  console.log(props.auth.data.user_email);
  return <h5>The setting page!</h5>;
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Settings);
