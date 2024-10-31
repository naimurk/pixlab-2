import Barcode from 'react-barcode';

function BarcodeComponent({ title, bgColor, fgColor }) {
    return (
        <div style={{ backgroundColor: bgColor, padding: '10px' }}>
            <Barcode
                value={title.length > 0 ? title : '0'}
                background={bgColor}
                lineColor={fgColor}
                width={2}  // Adjust width if needed
                height={100} // Adjust height if needed
                margin={10} // Adjust margin if needed
            />
        </div>
    );
}

export default BarcodeComponent;
