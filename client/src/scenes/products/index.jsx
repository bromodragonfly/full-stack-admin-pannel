import React, { useState } from 'react'
import {
    Box,
    Card,
    Typography,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Rating,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import Header from 'components/Header'
import { useGetProductsQuery } from 'state/api'

const Product = ({
    _id,
    name,
    descripton,
    price,
    raiting,
    category,
    supply,
    stat,
}) => {
    const theme = useTheme()
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Card
            sx={{
                backgroundImage: 'none',
                backgroundColor: theme.palette.background.alt,
                borderRadius: '0.55rem',
            }}
        >
            <CardContent>
                <Typography
                    sx={{ fontSize: '14px' }}
                    color={theme.palette.secondary[700]}
                    gutterBottom
                >
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography
                    sx={{ mb: '1.5rem' }}
                    color={theme.palette.secondary[400]}
                >
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={raiting} readOnly />

                <Typography variant="body2">{descripton}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{ color: theme.palette.neutral[300] }}
            ></Collapse>
            <CardContent>
                <Typography>id: {_id}</Typography>
                <Typography>Supply left: {supply}</Typography>
                <Typography>
                    Yearly Sales This Year: {stat.yearlySalesTotal}
                </Typography>
                <Typography>
                    Yearly Units This Year: {stat.yearlyTotalSoldUnits}
                </Typography>
            </CardContent>
        </Card>
    )
}

const Products = () => {
    const { data, isLoading } = useGetProductsQuery()
    const isNonMobile = useMediaQuery('(min-width: 1000px)')

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="PRODUCTS" subtitle="See your list of products" />
            {data || !isLoading ? (
                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    justifyContent="space-between"
                    rowGap="40px"
                    columnGap="1.33%"
                    sx={{
                        '& > div': {
                            gridColumn: isNonMobile ? undefined : 'span 4',
                        },
                    }}
                >
                    {data.map(
                        ({
                            _id,
                            name,
                            descripton,
                            price,
                            raiting,
                            category,
                            supply,
                            stat,
                        }) => (
                            <Product
                                key={_id}
                                _id={_id}
                                name={name}
                                descripton={descripton}
                                price={price}
                                raiting={raiting}
                                category={category}
                                supply={supply}
                                stat={stat}
                            />
                        )
                    )}
                </Box>
            ) : (
                <>Loading...</>
            )}
        </Box>
    )
}

export default Products
