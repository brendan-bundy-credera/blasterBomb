import { render } from '@testing-library/react';
import HomePageComponent from './home-page.component';
import * as Redux from 'react-redux';
import { RequestStatus } from '../../common/redux/redux.constants';

const mockState = {
  cart: {
    retrieveCart: {
      status: RequestStatus.IDLE
    }
  }
}

describe('home-page.component.jsx', () => {
  const dispatchMock = jest.fn();
  
  beforeEach(() => {
    // Mock the useSelector implementation to pass our mock state object - component should traverse the object as designed
    jest.spyOn(Redux, 'useSelector').mockImplementation(selector => selector(mockState));
    jest.spyOn(Redux, "useDispatch").mockReturnValue(dispatchMock);
  })

  it('should show loading element when retrieveCart status is LOADING', () => {
    // Arrange
    // Copy the state to a new object
    const loadingState = { ...mockState };
    // Set the status to loading which should have componet show the loading div
    loadingState.cart.retrieveCart.status = RequestStatus.LOADING;
    jest.spyOn(Redux, 'useSelector').mockImplementation(selector => selector(loadingState));
    // Act
    const { queryByTestId } = render(<HomePageComponent />);
    // Assert
    // Query for an element with a 'data-testid' attribute with a value of 'loading-spinner'
    expect(queryByTestId('loading-spinner')).toBeInTheDocument()
  });

});
