import { useState } from "react";
import { Container, Title, Text, SegmentedControl, Button, Card, Center, Badge, Stack, Group } from "@mantine/core";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { showNotification } from "@mantine/notifications";
import axios from "axios";

const PremiumSubscription = ({userData}) => {
    
    const [plan, setPlan] = useState("monthly");
    

    const pricing = {
        monthly: { 
            price: 50, 
            label: "Monthly Plan", 
            description: "Billed monthly" 
        },
        
        yearly: { 
            originalPrice: 600,  
            discountedPrice: 500, 
            label: "Yearly Plan", 
            description: "Billed annually (Save 15%)"
        }
    };

    const handleCheckout = () => {
        const selectedPrice = plan === "yearly" ? pricing.yearly.discountedPrice : pricing.monthly.price;

        showNotification({
            title:  plan === "yearly" ? "Annual Plan Selected" : "Monthly Plan Selected" ,
            message: (<>Proceeding to checkout for the <b> {plan === "yearly" ? "Annual " : "Monthly "}</b> plan. <br /> <b>Amount:</b> ${selectedPrice}
        </>),
            color: "green",
            icon: <FaCheckCircle />,
            autoClose: 3000, 
        });

        console.log(`Starting checkout process.. Plan: ${plan}, Amount: ${selectedPrice} EGP user: ${userData.id}`);
        axios.get('http://localhost:3000/paymob/token')
            .then((response) => {
            console.log("Received token:", response.data.token);
            sessionStorage.setItem('paymentToken', response.data.token);
            return axios.post('https://accept.paymob.com/api/ecommerce/orders', {
                headers: { Authorization: `Bearer ${response.data.token}` },
                auth_token: response.data.token,
                delivery_needed: false,
                amount_cents: selectedPrice * 100,
                currency: "EGP",
                merchant_order_id: `${userData.id}-${plan}`,
                items: []
            });
            })
            .then((response) => {
            const paymentToken = sessionStorage.getItem('paymentToken');
            console.log("Order created:", response.data, `Order token: ${response.data.token} auth token: ${paymentToken} Order ID: ${response.data.id}`);
            return axios.post('https://accept.paymob.com/api/acceptance/payment_keys', {
                headers: { Authorization: `Bearer ${paymentToken}` },
                auth_token: paymentToken,
                amount_cents: selectedPrice * 100,
                currency: "EGP",
                order_id: response.data.id,
                billing_data: {
                first_name: "Sandy",
                last_name: "Essam",
                email: "sandy@gmail.com",
                phone_number: "01234564789",
                city: "Cairo",
                country: "EG",
                street: "Cairo",
                building: 4,
                floor: 4,
                apartment: 4
                },
                currency: "EGP",
                integration_id: 4946729
            });
            })
            .then((response) => {
            console.log("Payment key created:", response.data);
            window.location.href = `https://accept.paymob.com/api/acceptance/iframes/898633?payment_token=${response.data.token}`;
            })
            .catch((error) => {
            console.error("An error occurred while processing payment:", error);
            if(error.response.data.message === 'duplicate'){
                showNotification({
                    title: "Error",
                    message: "You have already subscribed to this plan",
                    color: "red",
                    icon: <FaCheckCircle />,
                    autoClose: 5000, 
                });
            }
            }).finally(() => {
                sessionStorage.removeItem('paymentToken');
            });
    };
            

    return (
        <Container size="sm" mt={110}>
            <Title align="center" fw={900}>Go Premium...</Title>
            <Text align="center" mt="sm" color="dimmed">
                Unlock exclusive features and elevate your reading experience.
            </Text>

            <Center mt="lg">
                <SegmentedControl
                    value={plan}
                    onChange={setPlan}
                    fullWidth
                    data={[
                        { label: "Monthly", value: "monthly" },
                        { label: "Yearly", value: "yearly" }
                    ]}
                />
            </Center>

            <motion.div
                key={plan}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card shadow="md" p="lg" radius="lg" mt="lg" withBorder>
                <Group position="apart">
                        <Title order={3}>{pricing[plan].label}</Title>
                        {plan === "yearly" && <Badge color="green">Best Value</Badge>}
                </Group>

                    <Text size="xl" fw={700} mt="sm">
                        {plan === "yearly" ? (
                            <>
                                <Text span size="lg" color="red" style={{ textDecoration: "line-through", marginRight: "10px" }}>
                                    {pricing[plan].originalPrice} EGP
                                </Text>
                                <Text span size="xl" color="green">
                                    {pricing[plan].discountedPrice} EGP
                                </Text>
                            </>
                        ) : (
                            `${pricing[plan].price} EGP`
                        )}
                        {plan === "yearly" ? <Text span size="sm" color="dimmed">/year</Text> : <Text span size="sm" color="dimmed">/month</Text>}
                        
                    </Text>

                    <Text size="sm" color="dimmed">{pricing[plan].description}</Text>

                    <Stack mt="md" spacing="xs">
                        {plan === "yearly" &&  
                            <Group>
                                <FaCheckCircle size={22} color="lightgreen" />
                                <Text size="lg">15% Saving compared to monthly package</Text>
                            </Group>
                        }

                        <Group>
                            <FaCheckCircle size={22} color="lightgreen" />
                            <Text size="lg">Access to premium book reviews</Text>
                        </Group>
                        <Group>
                            <FaCheckCircle size={22} color="lightgreen" />
                            <Text size="lg">Personalized reading recommendations</Text>
                        </Group>
                        <Group>
                            <FaCheckCircle size={22} color="lightgreen"/>
                            <Text size="lg">Early access to new features</Text>
                        </Group>
                        <Group>
                            <FaCheckCircle size={22} color="lightgreen" />
                            <Text size="lg">Ad-free experience</Text>
                        </Group>
                        
                        
                    </Stack>

                    <Center mt="lg">
                        <Button size="md" variant="gradient" gradient={{ from: 'green', to: 'lightgreen' }} color="green" w="100%" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </Center>
                </Card>
            </motion.div>
           
        </Container>

    );
};

export default PremiumSubscription;
