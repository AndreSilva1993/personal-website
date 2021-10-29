import Image from 'next/image';
import styled from '@emotion/styled';

const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Page() {
  return (
    <WrapperDiv>
      <Image src="/images/404/planet.svg" width={100} height={100} />
    </WrapperDiv>
  );
}
