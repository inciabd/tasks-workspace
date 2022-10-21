import React from 'react';
import { render } from '@testing-library/react';
import { EfsaNavigation } from './navigation.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<EfsaNavigation />);
});
