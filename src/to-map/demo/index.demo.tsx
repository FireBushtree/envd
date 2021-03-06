import React, {useRef, useState} from 'react';
import {ToMap} from 'env-puzzle';
import {Card} from 'antd';

// @ts-ignore
import {Point} from 'env-puzzle/lib/b-map';

// @ts-ignore
import {ToMapControl} from 'env-puzzle/lib/to-map';

const ToMapDemo: React.FC = () => {
  const [point, setPoint] = useState<
    Point & {
      address?: string;
    }
  >();

  const toMapRef = useRef<ToMapControl>(null);

  return (
    <>
      {point && (
        <Card style={{width: 300}}>
          <p>经度: {point.lng}</p>
          <p>纬度: {point.lat}</p>
          <p>位置: {point.address}</p>
        </Card>
      )}
      <ToMap
        ref={toMapRef}
        onOk={(value) => {
          toMapRef.current.map.geocoder(value, (res: any) => {
            setPoint({
              ...value,
              address: res.address,
            });
          });
        }}
      />
    </>
  );
};

export default ToMapDemo;
