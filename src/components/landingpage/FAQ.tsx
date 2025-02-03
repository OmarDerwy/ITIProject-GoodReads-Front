import { Accordion, Container, Grid, Image, Title } from "@mantine/core";
import image from "../../assets/faqAnimate.svg";
import classes from "../../styles/landingpage/FaqWithImage.module.css";
import React from "react";

const passwordResetInstructions = `
You can reset your password by following these steps:

1. Go to the **Login** page.
2. Click on **"Forgot Password?"**  
3. Enter your registered email address and submit the request.  
4. Check your email for a password reset link.  
5. Click the link and follow the instructions to set a new password.  

If you don't receive the email, please check your spam folder or contact our support team.
`;

const multibleAccs =
"Each user is allowed to create and maintain only one account per email address. If you need to manage multiple accounts (for example, personal and business), please contact our support team for assistance.";

const newsletterSubscriptionInstructions = `You can subscribe to our monthly newsletter by:

1. Visiting the **Newsletter Subscription** section on our website.
2. Entering your email address in the subscription form.
3. Clicking the **"Subscribe"** button.

You’ll start receiving updates, promotions, and exclusive content directly in your inbox.  
You can unsubscribe anytime using the link in the email.
`;

const addBookToList = `You can add a book to your reading list by:

1.Searching for the book using the search bar.
2.Clicking on the book title to open its details page.
3.Selecting "Want to Read," "Currently Reading," or "Read" based on your preference.
`;

const creditSecurity =
"Yes, we take security very seriously. We do not store your credit card information on our servers. All payments are securely processed through trusted and PCI-compliant third-party payment gateways (such as Stripe or PayPal), ensuring your data is encrypted and protected. If you have any concerns about payment security, feel free to contact our support team.";

const updateProgress = `
To update your progress:

1.Go to the "Currently Reading" section.
2.Click "Update Progress."
3.Enter the page number or percentage completed.

`;

const mobileApp = `Yes! Our mobile app is available on both iOS and Android. Download it from the App Store or Google Play to access your reading list anytime.`;

export function FaqWithImage() {
return (
<div className={classes.wrapper}>
    <Container size={1500}>
    <Grid id="faq-grid" gutter={50}>
        <Grid.Col span={{ base: 12, md: 6 }}>
        <Image src={image} alt="Frequently Asked Questions" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
        <Title order={2} ta="left" className={classes.title}>
            Frequently Asked Questions
        </Title>

        <Accordion
            chevronPosition="right"
            defaultValue="reset-password"
            variant="separated"
        >
            <Accordion.Item className={classes.item} value="reset-password">
            <Accordion.Control className={classes.mantineAccordionControl}>
                How can I reset my password?
            </Accordion.Control>
            <Accordion.Panel>
                <pre>{passwordResetInstructions}</pre>
            </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="another-account">
            <Accordion.Control className={classes.mantineAccordionControl}>
                Can I create more that one account?
            </Accordion.Control>
            <Accordion.Panel>
                <pre>{multibleAccs}</pre>
            </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="newsletter">
            <Accordion.Control className={classes.mantineAccordionControl}>
                How can I subscribe to monthly newsletter?
            </Accordion.Control>
            <Accordion.Panel>
                <pre>{newsletterSubscriptionInstructions}</pre>
            </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="credit-card">
            <Accordion.Control className={classes.mantineAccordionControl}>
                Do you store credit card information securely?
            </Accordion.Control>
            <Accordion.Panel>
                <pre>{creditSecurity}</pre>
            </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="add-book-to-list">
            <Accordion.Control className={classes.mantineAccordionControl}>
                How can I add a book to my reading list?
            </Accordion.Control>
            <Accordion.Panel>
                <pre>{addBookToList}</pre>
            </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item
            className={classes.item}
            value="update-reading-progress"
            >
            <Accordion.Control className={classes.mantineAccordionControl}>
                How can I track my reading progress?
            </Accordion.Control>
            <Accordion.Panel>
                <pre>{updateProgress}</pre>
            </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="mobile-app">
            <Accordion.Control className={classes.mantineAccordionControl}>
                Is there a mobile app available?
            </Accordion.Control>
            <Accordion.Panel>
                <pre>{mobileApp}</pre>
            </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
        </Grid.Col>
    </Grid>
    </Container>
</div>
);
}
