import { Alert } from 'react-bootstrap';

export default function LoadingBox(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}
