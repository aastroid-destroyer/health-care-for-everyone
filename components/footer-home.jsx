import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-primary/10 via-background to-muted/30 border-t border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-2.5 shadow-md">
                                <Heart className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold tracking-tight text-foreground">স্বাস্থ্যসেবা</h3>
                                <p className="text-sm text-muted-foreground">Healthcare Platform</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Your personalized health dashboard for better wellness. Connecting communities with healthcare resources.
                        </p>
                        <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="icon" className="rounded-full bg-transparent hover:bg-primary/10">
                                <Facebook />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full bg-transparent hover:bg-primary/10">
                               <Twitter/>
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full bg-transparent hover:bg-primary/10">
                                <Instagram/>
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full bg-transparent hover:bg-primary/10">
                              <Github/>
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/mental-health" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Mental Health / মানসিক স্বাস্থ্য
                                </Link>
                            </li>
                            <li>
                                <Link href="/health-map" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Health Resources / স্বাস্থ্য সম্পদ
                                </Link>
                            </li>
                            <li>
                                <Link href="/maternal-health" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Maternal Care / মাতৃত্ব যত্ন
                                </Link>
                            </li>
                            <li>
                                <Link href="/seasonal-tips" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Health Tips / স্বাস্থ্য পরামর্শ
                                </Link>
                            </li>
                            <li>
                                <Link href="/volunteers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Volunteers / স্বেচ্ছাসেবক
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Help Center / সাহায্য কেন্দ্র
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Contact Us / যোগাযোগ করুন
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy / গোপনীয়তা নীতি
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service / সেবার শর্তাবলী
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    FAQ / সাধারণ প্রশ্ন
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">info@shastho-seba.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">+880 1841 469092</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">Dhaka, Bangladesh</span>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                                <Mail className="h-4 w-4" />
                                Subscribe to Newsletter
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} স্বাস্থ্যসেবা. All rights reserved.
                    </p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="/accessibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Accessibility
                        </Link>
                        <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Sitemap
                        </Link>
                        <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Careers
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}